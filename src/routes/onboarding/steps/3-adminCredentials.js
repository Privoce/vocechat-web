import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";
import { useCreateAdminMutation } from "../../../app/services/server";
import { useLoginMutation } from "../../../app/services/auth";

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

export default function AdminCredentialsStep({ step, setStep }) {
 const [
  createAdmin,
  { isLoading: isSignUpLoading, isSuccess: isSignUpSuccess, error: signUpError }
 ] = useCreateAdminMutation();
 const [login, { isLoading: isLoginLoading, isSuccess: isLoginSuccess, error: loginError }] =
  useLoginMutation();

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirm, setConfirm] = useState("");

 // Display error
 useEffect(() => {
  if (signUpError === undefined) return;
  toast.error(`Failed to sign up: ${signUpError.data}`);
 }, [signUpError]);

 useEffect(() => {
  if (loginError === undefined) return;
  toast.error(`Login failed: ${loginError.data}`);
 }, [loginError]);

 // Increment `step` when both signing up and logging in have completed
 useEffect(() => {
  if (isSignUpSuccess && isLoginSuccess) setStep(step + 1);
 }, [isSignUpSuccess, isLoginSuccess]);

 return (
  <StyledAdminCredentialsStep>
   <span className="primaryText">Now let’s set up your admin account</span>
   <span className="secondaryText">You are the 1st user and admin of your space!</span>
   <StyledInput
    className="input"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
   />
   <StyledInput
    className="input"
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
   />
   <StyledInput
    className="input"
    type="password"
    placeholder="Confirm your password"
    value={confirm}
    onChange={(e) => setConfirm(e.target.value)}
   />
   <StyledButton
    className="button"
    onClick={async () => {
     // Verification for admin credentials
     if (email === "") {
      toast.error("Please enter admin email!");
      return;
     } else if (password === "") {
      toast.error("Please enter admin password!");
      return;
     } else if (password !== confirm) {
      toast.error("Two passwords do not match!");
      return;
     }
     await createAdmin({
      email,
      name: "Admin",
      password,
      gender: 0
     });
     await login({
      email,
      password,
      type: "password"
     });
    }}
   >
    {!(isSignUpLoading || isLoginLoading) ? "Sign Up" : "..."}
   </StyledButton>
  </StyledAdminCredentialsStep>
 );
}
