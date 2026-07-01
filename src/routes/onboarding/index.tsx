import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWizard, Wizard } from "react-use-wizard";
import clsx from "clsx";

import { buildSteps } from "./steps";
import AdminAccount from "./steps/admin-account";
import DonePage from "./steps/done-page";
import GetPublicDomain from "./steps/get-public-domain";
import ServerName from "./steps/server-name";
import WelcomePage from "./steps/welcome-page";
import WhoCanSignUp from "./steps/who-can-sign-up";
import SelectLanguage from "../../components/Language";
import { useGetAutoTunnelInfoQuery, useGetServerVersionQuery } from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import { compareVersion } from "@/utils";
import { trackUmamiEvent } from "@/utils/umami";
import { shallowEqual } from "react-redux";

const TUNNEL_MIN_VERSION = "0.5.19";

const Navigator = ({ showTunnelStep }: { showTunnelStep: boolean }) => {
  const { activeStep, goToStep } = useWizard();
  const steps = buildSteps(showTunnelStep);
  const canJumpTo = steps[activeStep]?.canJumpTo || [];
  console.log("active step", activeStep);

  return (
    <div className="hidden md:flex absolute top-5 w-full justify-center gap-2 z-10">
      {steps.map((stepToRender, indexToRender) => {
        const clickable = canJumpTo.includes(stepToRender.name);
        const itemClass = clsx(
          `text-sm text-gray-600`,
          clickable && "cursor-pointer md:hover:text-gray-500",
          indexToRender === activeStep && "font-bold text-black",
          indexToRender >= activeStep && "text-gray-400"
        );
        const nodeCls = `${itemClass}`;
        return (
          <React.Fragment key={indexToRender}>
            <span
              className={nodeCls}
              onClick={() => {
                if (clickable) {
                  goToStep(indexToRender);
                }
              }}
            >
              {stepToRender.label}
            </span>
            {indexToRender !== steps.length - 1 && <span className={nodeCls}>→</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function OnboardingPage() {
  const { t } = useTranslation("welcome");
  const [serverName, setServerName] = useState("");

  // Load Umami and fire "installed" once when the onboarding page mounts.
  // forceLoad=true so the script is fetched here and only here.
  useEffect(() => {
    trackUmamiEvent("installed");
  }, []);
  const { isLoading: versionLoading } = useGetServerVersionQuery();
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const versionOk = !!currentVersion && compareVersion(currentVersion, TUNNEL_MIN_VERSION) >= 0;
  const { data: autoInfo } = useGetAutoTunnelInfoQuery(undefined, { skip: !versionOk });
  const showTunnelStep = versionOk && !!autoInfo && !autoInfo.auto_cftunnel;

  // Wait until we know whether to show the tunnel step before mounting Wizard
  // so step count is stable from mount
  const ready = !versionLoading && (!versionOk || autoInfo !== undefined);
  if (!ready) return null;

  return (
    <>
      <title>{t("onboarding.title") || ""}</title>
      <div className="h-screen bg-neutral-100 dark:bg-neutral-900 overflow-y-auto">
        <Wizard header={<Navigator showTunnelStep={showTunnelStep} />}>
          <WelcomePage />
          <ServerName serverName={serverName} setServerName={setServerName} />
          <AdminAccount serverName={serverName} />
          <WhoCanSignUp />
          {showTunnelStep && <GetPublicDomain />}
          <DonePage serverName={serverName} />
        </Wizard>
      </div>
      <SelectLanguage />
    </>
  );
}
