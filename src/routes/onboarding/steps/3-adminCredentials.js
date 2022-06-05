import styled from "styled-components";
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";
import toast from "react-hot-toast";

const StyledAdminCredentialsStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .input:not(:nth-last-child(2)) {
  margin-bottom: 20px;
 }

 > .button {
  margin-top: 24px;
 }
`;

export default function AdminCredentialsStep({ step, setStep, data, setData }) {
 return (
  <StyledAdminCredentialsStep>
   <span className="primaryText">Now let’s set up your admin account</span>
   <span className="secondaryText">You are the 1st user and admin of your space!</span>
   <StyledInput
    className="input"
    placeholder="Enter your email"
    value={data.adminEmail}
    onChange={(e) =>
     setData({
      ...data,
      adminEmail: e.target.value
     })
    }
   />
   <StyledInput
    className="input"
    type="password"
    placeholder="Enter your password"
    value={data.adminPassword}
    onChange={(e) =>
     setData({
      ...data,
      adminPassword: e.target.value
     })
    }
   />
   <StyledInput
    className="input"
    type="password"
    placeholder="Confirm your password"
    value={data.adminPassword2}
    onChange={(e) =>
     setData({
      ...data,
      adminPassword2: e.target.value
     })
    }
   />
   <StyledButton
    className="button"
    onClick={() => {
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
    }}
   >
    Sign Up
   </StyledButton>
  </StyledAdminCredentialsStep>
 );
}
