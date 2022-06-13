import React from "react";
import { Helmet } from "react-helmet";
import WelcomePage from "./steps/welcomePage";
import ServerName from "./steps/serverName";
import AdminAccount from "./steps/adminAccount";
import WhoCanSignUp from "./steps/whoCanSignUp";
import InviteLink from "./steps/inviteLink";
import DonePage from "./steps/donePage";
import useServerSetup, { steps } from "./useServerSetup";
import StyledOnboardingPage from "./styled";

function Navigator({ step, setStep }) {
  const index = steps.map((value) => value.name).indexOf(step);
  const canJumpTo = steps.find((value) => value.name === step).canJumpTo || [];

  return (
    <div className="navigator">
      {steps.map((stepToRender, indexToRender) => {
        const clickable = canJumpTo.includes(stepToRender.name);
        const nodeCls = `node ${indexToRender === index ? "emphasized" : ""} ${
          indexToRender > index ? "disabled" : ""
        } ${clickable ? "clickable" : ""}`;
        const arrowCls = `arrow ${indexToRender >= index ? "disabled" : ""}`;
        return (
          <React.Fragment key={indexToRender}>
            <span
              className={nodeCls}
              onClick={() => {
                if (clickable) {
                  setStep(stepToRender.name);
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
}

export default function OnboardingPage() {
  const serverSetup = useServerSetup();

  return (
    <>
      <Helmet>
        <title>Rustchat Setup</title>
      </Helmet>
      <StyledOnboardingPage>
        <Navigator {...serverSetup} />
        {serverSetup.step === "welcomePage" && <WelcomePage {...serverSetup} />}
        {serverSetup.step === "serverName" && <ServerName {...serverSetup} />}
        {serverSetup.step === "adminAccount" && <AdminAccount {...serverSetup} />}
        {serverSetup.step === "whoCanSignUp" && <WhoCanSignUp {...serverSetup} />}
        {serverSetup.step === "inviteLink" && <InviteLink {...serverSetup} />}
        {serverSetup.step === "donePage" && <DonePage {...serverSetup} />}
      </StyledOnboardingPage>
    </>
  );
}
