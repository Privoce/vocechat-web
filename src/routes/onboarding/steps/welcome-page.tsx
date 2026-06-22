import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWizard } from "react-use-wizard";

import StyledButton from "@/components/styled/Button";
import PlayIcon from "@/assets/icons/play.svg?url";
import { BASE_ORIGIN } from "@/app/config";
import { useGetAutoTunnelInfoQuery } from "@/app/services/server";

type Phase = "loading" | "normal" | "initializing" | "dns_wait" | "redirecting";

const COUNTDOWN_SECONDS = 10;

interface SseEvent {
  event: string;
  message: string;
  url: string | null;
  progress: number | null;
}

export default function WelcomePage() {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const { nextStep } = useWizard();
  const { data: autoInfo, isLoading, isError } = useGetAutoTunnelInfoQuery();

  const [phase, setPhase] = useState<Phase>("loading");
  const [logs, setLogs] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [tunnelUrl, setTunnelUrl] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine phase once auto_info loads
  useEffect(() => {
    if (isLoading) return;
    if (isError || !autoInfo?.auto_cftunnel) {
      setPhase("normal");
      return;
    }
    // AUTO_CFTUNNEL=true: check if already running
    if (autoInfo.tunnel_status.status === "running" && autoInfo.tunnel_status.url) {
      setTunnelUrl(autoInfo.tunnel_status.url);
      startDnsCountdown(autoInfo.tunnel_status.url);
    } else {
      setPhase("initializing");
    }
  }, [isLoading, autoInfo]);

  // Subscribe to SSE progress stream while initializing
  useEffect(() => {
    if (phase !== "initializing") return;

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    (async () => {
      try {
        const resp = await fetch(`${BASE_ORIGIN}/api/admin/cloudflared/auto_stream`, { signal: ctrl.signal });
        if (!resp.ok || !resp.body) return;

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          const parts = buf.split("\n\n");
          buf = parts.pop() ?? "";

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data:")) continue;
            try {
              const evt: SseEvent = JSON.parse(line.slice("data:".length).trim());
              if (evt.message) {
                setLogs((prev) => [...prev.slice(-29), evt.message]);
              }
              if (evt.event === "url" || evt.event === "already_running") {
                reader.cancel();
                startDnsCountdown(evt.url!);
                return;
              }
            } catch {
              // ignore malformed lines
            }
          }
        }
      } catch {
        // AbortError on cleanup, or transient network error — stay in initializing
      }
    })();

    return () => {
      abortRef.current?.abort();
    };
  }, [phase]);

  const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(location.origin);

  function startDnsCountdown(url: string) {
    setPhase("dns_wait");
    if (!isLocalhost) return;
    setCountdown(COUNTDOWN_SECONDS);
    let remaining = COUNTDOWN_SECONDS;
    countRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(countRef.current!);
        setPhase("redirecting");
        window.location.href = url;
      }
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (countRef.current) clearInterval(countRef.current);
    };
  }, []);

  if (phase === "loading" || isLoading) {
    return (
      <div className="flex-center flex-col h-full text-center dark:text-gray-100">
        <div className="w-8 h-8 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === "normal") {
    return (
      <div className="flex-center flex-col h-full text-center dark:text-gray-100">
        <span className="text-2xl mb-2 font-bold">{t("welcome")}</span>
        <span className="text-sm mb-6">{t("welcome_desc")}</span>
        <StyledButton
          className="!w-32 h-auto flex flex-col gap-2 items-center py-3 text-sm"
          onClick={nextStep}
        >
          <img src={PlayIcon} alt="play icon" />
          <span>{t("start")}</span>
        </StyledButton>
      </div>
    );
  }

  if (phase === "initializing") {
    return (
      <div className="flex-center flex-col h-full text-center gap-6 dark:text-gray-100 px-4">
        <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-lg font-semibold">{t("tunnel_initializing")}</span>
        {logs.length > 0 && (
          <div className="w-full md:w-[480px] p-3 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-xs text-gray-500 dark:text-gray-400 max-h-40 overflow-y-auto text-left flex flex-col gap-0.5">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (phase === "dns_wait" || phase === "redirecting") {
    return (
      <div className="flex-center flex-col h-full text-center gap-6 dark:text-gray-100 px-4 md:max-w-md m-auto">
        {isLocalhost && (
          <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
        )}
        {tunnelUrl && (
          <a
            href={tunnelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm break-all text-green-600 dark:text-green-400 underline"
          >
            {tunnelUrl}
          </a>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("tunnel_dns_warning")}
        </p>
        {isLocalhost ? (
          <span className="text-lg font-semibold">
            {t("tunnel_redirect_countdown", { seconds: countdown })}
          </span>
        ) : (
          <StyledButton className="w-32 h-11" onClick={nextStep}>
            {t("tunnel_opt_in_skip")}
          </StyledButton>
        )}
      </div>
    );
  }

  return null;
}
