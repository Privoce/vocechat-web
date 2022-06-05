import { useState } from "react";
import { Navigate } from "react-router-dom";
import WelcomeStep from "./steps/1-welcome";
import SpaceNameStep from "./steps/2-spaceName";
import AdminCredentialsStep from "./steps/3-adminCredentials";
import InviteRuleStep from "./steps/4-inviteRule";
import InviteLinkStep from "./steps/5-inviteLink";
import CompletedStep from "./steps/6-completed";
import StyledOnboardingPage from "./styled";

export default function OnboardingPage() {
 const [step, setStep] = useState(0);
 const [data, setData] = useState({
  spaceName: "",
  adminEmail: "",
  adminPassword: "",
  adminPassword2: "",
  inviteRule: null
 });
 const props = { step, setStep, data, setData };

 return (
  <StyledOnboardingPage>
   <div className="horizontalBox">
    <div className="verticalBox">
     {step === 0 && <WelcomeStep {...props} />}
     {step === 1 && <SpaceNameStep {...props} />}
     {step === 2 && <AdminCredentialsStep {...props} />}
     {step === 3 && <InviteRuleStep {...props} />}
     {step === 4 && <InviteLinkStep {...props} />}
     {step === 5 && <CompletedStep {...props} />}
     {step === 6 && <Navigate replace to="/" />}
    </div>
   </div>
  </StyledOnboardingPage>
 );
}
