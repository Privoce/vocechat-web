import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";

import { BASE_ORIGIN, tokenHeader } from "@/app/config";
import { useLazyGetCloudflaredStatusQuery, useStopCloudflaredMutation } from "@/app/services/server";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import Button from "@/components/styled/Button";
import { getLocalAuthData, compareVersion } from "@/utils";
import { useAppSelector } from "@/app/store";
import { trackUmamiEvent } from "@/utils/umami";

const TUNNEL_MIN_VERSION = "0.5.19";

type TunnelStatus = "idle" | "downloading" | "starting" | "running" | "error";

interface SseEvent {
  event: string;
  message: string;
  url: string | null;
  progress: number | null;
}

export default function Cloudflared() {
  const { t } = useTranslation("setting", { keyPrefix: "cloudflared" });
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const versionOk = !!currentVersion && compareVersion(currentVersion, TUNNEL_MIN_VERSION) >= 0;
  const [status, setStatus] = useState<TunnelStatus>("idle");
  const [tunnelUrl, setTunnelUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const [getStatus] = useLazyGetCloudflaredStatusQuery();
  const [stopCloudflared, { isLoading: isStopping }] = useStopCloudflaredMutation();

  useEffect(() => {
    if (!versionOk) return;
    getStatus().then((res) => {
      if (res.data) {
        setStatus(res.data.status);
        setTunnelUrl(res.data.url);
        setErrorMsg(res.data.error);
      }
    });
  }, [versionOk]);

  const addLog = (msg: string) =>
    setLogs((prev) => [...prev.slice(-29), msg]);

  const handleSseEvent = (evt: SseEvent) => {
    addLog(evt.message);
    switch (evt.event) {
      case "downloading":
        setStatus("downloading");
        if (evt.progress != null) setDownloadProgress(evt.progress);
        break;
      case "progress":
        setStatus("starting");
        break;
      case "url":
        setStatus("running");
        setTunnelUrl(evt.url);
        break;
      case "already_running":
        setStatus("running");
        setTunnelUrl(evt.url);
        break;
      case "error":
        setStatus("error");
        setErrorMsg(evt.message);
        break;
      case "stopped":
        setStatus("idle");
        break;
    }
  };

  const startTunnel = async () => {
    if (streaming) return;
    trackUmamiEvent("create_tunnel_settings");
    setStreaming(true);
    setStatus("starting");
    setLogs([]);
    setTunnelUrl(null);
    setErrorMsg(null);
    setDownloadProgress(0);

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
        setStatus("error");
        setErrorMsg(`HTTP ${resp.status}`);
        setStreaming(false);
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
            handleSseEvent(evt);
            if (["url", "error", "stopped", "already_running"].includes(evt.event)) {
              reader.cancel();
              setStreaming(false);
              return;
            }
          } catch {
            // ignore malformed lines
          }
        }
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setStatus("error");
        setErrorMsg(String(err));
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const handleStop = async () => {
    abortRef.current?.abort();
    await stopCloudflared();
    setStatus("idle");
    setTunnelUrl(null);
    setLogs([]);
  };

  const handleCopyUrl = () => {
    if (!tunnelUrl) return;
    navigator.clipboard.writeText(tunnelUrl);
    toast.success(t("url_copied"));
  };

  const statusBadge: Record<TunnelStatus, string> = {
    idle: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    downloading: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    starting: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    running: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    error: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };

  const isActive = status === "running" || status === "downloading" || status === "starting";

  return (
    <ServerVersionChecker version="0.5.19">
      <div className="setting-container max-md:w-full flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t("title")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("desc")}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge[status]}`}>
            {t(`status.${status}`)}
          </span>
        </div>

        {status === "downloading" && (
          <div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>{t("downloading_binary")}</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}

        {status === "running" && tunnelUrl && (
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
            <a
              href={tunnelUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-green-700 dark:text-green-300 font-mono break-all flex-1 hover:underline"
            >
              {tunnelUrl}
            </a>
            <button
              onClick={handleCopyUrl}
              className="shrink-0 text-xs px-2 py-1 rounded bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 hover:bg-green-300 dark:hover:bg-green-600 transition-colors"
            >
              {t("copy")}
            </button>
          </div>
        )}

        {status === "error" && errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-sm text-red-700 dark:text-red-300 break-all">
            {errorMsg}
          </div>
        )}

        {logs.length > 0 && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-xs text-gray-500 dark:text-gray-400 max-h-44 overflow-y-auto flex flex-col gap-0.5">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {!isActive && (
            <Button disabled={streaming} onClick={startTunnel}>
              {t("start")}
            </Button>
          )}
          {isActive && (
            <button
              onClick={handleStop}
              disabled={isStopping}
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
            >
              {isStopping ? t("stopping") : t("stop")}
            </button>
          )}
        </div>
      </div>
    </ServerVersionChecker>
  );
}
