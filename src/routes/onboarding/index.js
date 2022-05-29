import { useState } from "react";
import toast from "react-hot-toast";
import StyledButton from "../../common/component/styled/Button";
import FirstStep from "./steps/first";
import SpaceNameStep from "./steps/spaceName";
import AdminCredentialsStep from "./steps/adminCredentials";
import InviteRuleStep from "./steps/inviteRule";
import InviteLinkStep from "./steps/inviteLink";
import LastStep from "./steps/last";
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

 return (
  <StyledOnboardingPage>
   <div className="horizontalBox">
    <div className="verticalBox">
     {step > 0 && step < 5 && (
      <>
       <StyledButton className="buttonBack ghost border_less" onClick={() => setStep(step - 1)}>
        Back
       </StyledButton>
       <StyledButton
        className="buttonNext"
        onClick={() => {
         if (step === 1) {
          // Verification for space name
          if (data.spaceName === "") {
           toast.error("Please enter space name!");
           return;
          }
          setStep(step + 1);
         } else if (step === 2) {
          // Verification for admin credentials
          if (data.adminEmail === "") {
           toast.error("Please enter admin email!");
           return;
          } else if (data.adminPassword === "") {
           toast.error("Please enter admin password!");
           return;
          } else if (data.adminPassword !== data.adminPassword2) {
           toast.error("Two passwords do not match!");
           return;
          }
          setStep(step + 1);
         } else if (step === 3) {
          // Verification for invitation rule
          if (data.inviteRule === null) {
           toast.error("Please choose one option!");
           return;
          }
          setStep(step + 1);
         } else if (step === 4) {
          // Verification for invitation link
          setStep(step + 1);
         }
        }}
       >
        Next
       </StyledButton>
      </>
     )}
     {step === 0 && <FirstStep onButtonClick={() => setStep(step + 1)} />}
     {step === 1 && <SpaceNameStep data={data} setData={setData} />}
     {step === 2 && <AdminCredentialsStep data={data} setData={setData} />}
     {step === 3 && <InviteRuleStep data={data} setData={setData} />}
     {step === 4 && <InviteLinkStep />}
     {step === 5 && (
      <LastStep
       data={data}
       onButtonClick={() => {
        // TODO: finish it
        console.log("onboarding steps completed:", data);
       }}
      />
     )}
    </div>
   </div>
  </StyledOnboardingPage>
 );
}
