import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useWizard, Wizard } from 'react-use-wizard';

import WelcomePage from "./steps/welcomePage";
import ServerName from "./steps/serverName";
import AdminAccount from "./steps/adminAccount";
import WhoCanSignUp from "./steps/whoCanSignUp";
import InviteLink from "./steps/inviteLink";
import DonePage from "./steps/donePage";
import steps from "./steps";
import StyledOnboardingPage from "./styled";
import { useTranslation } from "react-i18next";


const Navigator = () => {
  const { activeStep, goToStep } = useWizard();
  const canJumpTo = steps[activeStep]?.canJumpTo || [];
  console.log("active step", activeStep);

  return (
    <div className="navigator">
      {steps.map((stepToRender, indexToRender) => {
        const clickable = canJumpTo.includes(stepToRender.name);
        const nodeCls = `node ${indexToRender === activeStep ? "emphasized" : ""} ${indexToRender > activeStep ? "disabled" : ""
          } ${clickable ? "clickable" : ""}`;
        const arrowCls = `arrow ${indexToRender >= activeStep ? "disabled" : ""}`;
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
            {indexToRender !== steps.length - 1 && <span className={arrowCls}>→</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function OnboardingPage() {
  const { t } = useTranslation("welcome");
  const [serverName, setServerName] = useState("");
  return (
    <>
      <Helmet>
        <title>{t("onboarding.title")}</title>
      </Helmet>
      <StyledOnboardingPage>
        <Wizard header={<Navigator />}>
          <WelcomePage />
          <ServerName serverName={serverName} setServerName={setServerName} />
          <AdminAccount serverName={serverName} />
          <WhoCanSignUp />
          {/* lazy call invite link API  */}
          <InviteLink />
          <DonePage serverName={serverName} />
        </Wizard>
      </StyledOnboardingPage>
    </>
  );
}
