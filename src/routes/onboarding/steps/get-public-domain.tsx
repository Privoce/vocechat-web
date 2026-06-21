import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useWizard } from "react-use-wizard";
import { shallowEqual } from "react-redux";

import StyledButton from "@/components/styled/Button";
import { BASE_ORIGIN, tokenHeader } from "@/app/config";
import { getLocalAuthData, compareVersion } from "@/utils";
import { useAppSelector } from "@/app/store";

const REQUIRED_VERSION = "0.5.19";

type Phase = "prompt" | "starting" | "done" | "error";

const COUNTDOWN_SECONDS = 10;

interface SseEvent {
  event: string;
  message: string;
  url: string | null;
  progress: number | null;
}

export default function GetPublicDomain() {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const { t: tCommon } = useTranslation();
  const { nextStep } = useWizard();
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);

  const [phase, setPhase] = useState<Phase>("prompt");
  const [logs, setLogs] = useState<string[]>([]);
  const [tunnelUrl, setTunnelUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const abortRef = useRef<AbortController | null>(null);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (countRef.current) clearInterval(countRef.current);
    };
  }, []);

  const addLog = (msg: string) =>
    setLogs((prev) => [...prev.slice(-29), msg]);

  function startCountdown(url: string) {
    setTunnelUrl(url);
    setPhase("done");
    let remaining = COUNTDOWN_SECONDS;
    setCountdown(remaining);
    countRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(countRef.current!);
        window.location.href = url;
      }
    }, 1000);
  }

  const handleYes = async () => {
    setPhase("starting");
    setLogs([]);
    setErrorMsg(null);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const { token } = getLocalAuthData();
      const resp = await fetch(`${BASE_ORIGIN}/api/admin/cloudflared/start`, {
        method: "POST",
        headers: { [tokenHeader]: token },
        signal: ctrl.signal,
      });

      if (!resp.ok || !resp.body) {
        setPhase("error");
        setErrorMsg(`HTTP ${resp.status}`);
        return;
      }

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
            addLog(evt.message);
            if (evt.event === "url" || evt.event === "already_running") {
              reader.cancel();
              startCountdown(evt.url!);
              return;
            }
            if (evt.event === "error" || evt.event === "stopped") {
              reader.cancel();
              setPhase("error");
              setErrorMsg(evt.message);
              return;
            }
          } catch {
            // ignore malformed lines
          }
        }
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setPhase("error");
        setErrorMsg(String(err));
      }
    }
  };

  if (currentVersion && compareVersion(currentVersion, REQUIRED_VERSION) < 0) {
    return (
      <div className="flex-center flex-col h-full text-center gap-6 dark:text-gray-100 px-4">
        <div className="flex flex-col gap-2 items-center border border-solid border-orange-500 p-4 rounded-lg max-w-sm">
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            <Trans i18nKey={"server_update.version_needed"}>
              <strong className="font-bold">{{ version: REQUIRED_VERSION }}</strong>
            </Trans>
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            <Trans i18nKey={"server_update.current_version"}>
              <strong className="font-bold">{{ version: currentVersion }}</strong>
            </Trans>
          </span>
          <span className="text-gray-400 text-sm">{tCommon("server_update.update_tip")}</span>
          <a
            className="text-blue-500 underline text-sm"
            href="https://doc.voce.chat/install/docker"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tCommon("server_update.howto")} 📖
          </a>
        </div>
        <StyledButton className="w-24 h-11 ghost" onClick={nextStep}>
          {t("tunnel_opt_in_skip")}
        </StyledButton>
      </div>
    );
  }

  if (phase === "prompt") {
    return (
      <div className="flex-center flex-col h-full text-center gap-8 dark:text-gray-100 px-4">
        <span className="text-2xl font-bold">{t("tunnel_opt_in_title")}</span>
        <div className="flex gap-4">
          <StyledButton className="w-24 h-11" onClick={handleYes}>
            {t("tunnel_opt_in_yes")}
          </StyledButton>
          <StyledButton className="w-24 h-11 ghost" onClick={nextStep}>
            {t("tunnel_opt_in_skip")}
          </StyledButton>
        </div>
      </div>
    );
  }

  if (phase === "starting") {
    return (
      <div className="flex-center flex-col h-full text-center gap-6 dark:text-gray-100 px-4">
        <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-lg font-semibold">{t("tunnel_progress")}</span>
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

  if (phase === "done" && tunnelUrl) {
    return (
      <div className="flex-center flex-col h-full text-center gap-6 dark:text-gray-100 px-4 md:max-w-md m-auto">
        <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-sm break-all text-green-600 dark:text-green-400">
          {tunnelUrl}
        </span>
        <span className="text-lg font-semibold">
          {t("tunnel_redirect_countdown", { seconds: countdown })}
        </span>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="flex-center flex-col h-full text-center gap-6 dark:text-gray-100 px-4">
        <span className="text-lg font-semibold text-red-500">{t("tunnel_error")}</span>
        {errorMsg && (
          <p className="text-sm text-gray-500 dark:text-gray-400 break-all max-w-sm">
            {errorMsg}
          </p>
        )}
        <StyledButton className="w-24 h-11" onClick={nextStep}>
          {t("tunnel_opt_in_skip")}
        </StyledButton>
      </div>
    );
  }

  return null;
}
