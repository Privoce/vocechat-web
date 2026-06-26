import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import { BASE_ORIGIN } from "@/app/config";
import { compareVersion } from "@/utils";
import { useAppSelector } from "@/app/store";
import QRCode from "@/components/QRCode";
import Button from "@/components/styled/Button";

const IFRAME_MIN_VERSION = "0.5.21";

const GuestBlankPlaceholder = () => {
  const { t } = useTranslation("auth");
  const navigateTo = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const qrCanvasRef = useRef<HTMLDivElement>(null);
  const serverName = useAppSelector((store) => store.server.name, shallowEqual);
  const serverVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const logo = useAppSelector((store) => store.server.logo, shallowEqual);

  const useIframe = useMemo(() => compareVersion(serverVersion, IFRAME_MIN_VERSION) >= 0, [serverVersion]);

  const getQRDataURL = (): string | null => {
    const canvas = qrCanvasRef.current?.querySelector("canvas");
    if (!canvas) return null;
    try {
      return canvas.toDataURL("image/png");
    } catch {
      return null;
    }
  };

  const sendServerInfo = () => {
    const qrDataURL = getQRDataURL();
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "server_info",
        name: serverName,
        qrDataURL,
        signInLabel: t("sign_in"),
        guestTip: t("guest_login_tip"),
      },
      "*"
    );
  };

  useEffect(() => {
    if (!useIframe) return;
    const handler = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "iframe_ready" && e.data.page === "guest") {
        sendServerInfo();
      }
      if (e.data.type === "action" && e.data.action === "sign_in") {
        navigateTo("/login");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [useIframe, serverName, logo, navigateTo, t]);

  useEffect(() => {
    if (!useIframe) return;
    const timer = setTimeout(() => sendServerInfo(), 50);
    return () => clearTimeout(timer);
  }, [useIframe, serverName, logo]);

  if (!useIframe) {
    return (
      <section className="flex flex-col items-center text-center">
        <h2 className="text-3xl text-gray-600 dark:text-gray-50 font-bold">
          {t("welcome", { name: serverName })}
        </h2>
        <div className="flex flex-col gap-2">
          <span className="text-gray-400 dark:text-gray-200 my-3 text-sm">
            {t("guest_login_tip")}
          </span>
          <div className="w-44 h-44 self-center mb-4">
            <QRCode level="Q" size={1200} link={BASE_ORIGIN} />
          </div>
          {process.env.NODE_ENV === "development" && <span>{BASE_ORIGIN}</span>}
          <Button onClick={() => navigateTo("/login")} className="small">
            {t("sign_in")}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hidden QR canvas — React renders it so we can extract dataURL */}
      <div ref={qrCanvasRef} className="hidden">
        <QRCodeCanvas
          value={BASE_ORIGIN}
          size={512}
          level="Q"
          bgColor="#fff"
          fgColor="#000"
          marginSize={2}
        />
      </div>
      <iframe
        ref={iframeRef}
        src={`${BASE_ORIGIN}/api/page/landing`}
        className="w-full h-full border-0"
        title="Landing Page"
      />
    </>
  );
};

export default GuestBlankPlaceholder;
