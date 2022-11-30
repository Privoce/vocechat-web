import { useEffect, useState, FC } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";
import {
  useCreateAdminMutation,
  useGetServerQuery,
  useUpdateServerMutation
} from "../../../app/services/server";
import { useLoginMutation } from "../../../app/services/auth";
import { updateInitialized } from "../../../app/slices/auth.data";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
  }

  > .input {
    width: 360px;
    height: 44px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);

    > .inner {
      padding: 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }

    &:not(:nth-last-child(2)) {
      margin-bottom: 20px;
    }
  }

  > .button {
    width: 360px;
    margin-top: 24px;
  }
`;
type Props = {
  serverName: string;
  nextStep: () => void;
};
const AdminAccount: FC<Props> = ({ serverName, nextStep }) => {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const loggedIn = useAppSelector((store) => !!store.authData.token);
  const dispatch = useDispatch();

  const [createAdmin, { isLoading: isSigningUp, isError: signUpError, isSuccess: signUpOk }] = useCreateAdminMutation();
  const [login, { isLoading: isLoggingIn, isError: loginError, }] = useLoginMutation();
  const { data: serverData } = useGetServerQuery();
  const [updateServer, { isLoading: isUpdatingServer, isSuccess: isUpdatedServer }] =
    useUpdateServerMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Display error
  useEffect(() => {
    if (signUpError) {
      toast.error(`Failed to sign up`);
    }
  }, [signUpError]);
  useEffect(() => {
    if (signUpOk) {
      login({
        email,
        password,
        type: "password"
      });
    }
  }, [signUpOk]);
  useEffect(() => {
    if (loginError) {
      toast.error(`Login failed`);
    }
  }, [loginError]);

  // After logged in
  useEffect(() => {
    if (loggedIn && serverData) {
      dispatch(updateInitialized(true));
      // Set server name
      updateServer({
        ...serverData,
        name: serverName
      });
    }
  }, [loggedIn]);

  // After updated server
  useEffect(() => {
    if (isUpdatedServer) {
      nextStep();
    }
  }, [isUpdatedServer]);

  return (
    <StyledWrapper>
      <span className="primaryText">{t("admin_title")}</span>
      <span className="secondaryText">{t("admin_desc")}</span>
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
          createAdmin({
            email,
            name: "Admin",
            password,
            gender: 0
          });

        }}
      >
        {!(isSigningUp || isLoggingIn || isUpdatingServer) ? t("sign") : "..."}
      </StyledButton>
    </StyledWrapper>
  );
};
export default AdminAccount;
