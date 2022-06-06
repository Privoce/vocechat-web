import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import WelcomeStep from "./steps/1-welcome";
import ServerNameStep from "./steps/2-serverName";
import AdminCredentialsStep from "./steps/3-adminCredentials";
import InviteRuleStep from "./steps/4-inviteRule";
import InviteLinkStep from "./steps/5-inviteLink";
import CompletedStep from "./steps/6-completed";
import StyledOnboardingPage from "./styled";

export default function OnboardingPage() {
 const [step, setStep] = useState(0);
 const [data, setData] = useState({
  serverName: ""
 });
 const props = { setStep, data, setData };

 return (
  <>
   <Helmet>
    <title>Rustchat Setup</title>
   </Helmet>
   <StyledOnboardingPage>
    {step === 0 && <WelcomeStep {...props} />}
    {step === 1 && <ServerNameStep {...props} />}
    {step === 2 && <AdminCredentialsStep {...props} />}
    {step === 3 && <InviteRuleStep {...props} />}
    {step === 4 && <InviteLinkStep {...props} />}
    {step === 5 && <CompletedStep {...props} />}
    {step === 6 && <Navigate replace to="/" />}
   </StyledOnboardingPage>
  </>
 );
}
