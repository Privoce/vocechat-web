import { useEffect, useState, FC, useRef } from "react";
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
import { useWizard } from "react-use-wizard";

type Props = {
  serverName: string;
};
const AdminAccount: FC<Props> = ({ serverName }) => {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const { nextStep } = useWizard();
  const formRef = useRef<HTMLFormElement | undefined>();
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
    <div className="h-full flex-center flex-col text-center w-[360px] m-auto">
      <span className="text-2xl mb-2 font-bold">{t("admin_title")}</span>
      <span className="text-sm mb-6">{t("admin_desc")}</span>
      <form ref={formRef} action="/" className="flex flex-col gap-2 w-full">
        <StyledInput
          className="large"
          placeholder="Enter your email"
          type={"email"}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          className="large"
          type="password"
          required
          minLength={6}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledInput
          className="large"
          type="password"
          required
          minLength={6}
          placeholder="Confirm your password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </form>
      <StyledButton
        className="mt-6 w-full"
        onClick={async () => {
          const formEle = formRef?.current;
          if (formEle) {
            if (!formEle.checkValidity()) {
              formEle.reportValidity();
              return;
            }
            // nextStep();
            createAdmin({
              email,
              name: "Admin",
              password,
              gender: 0
            });
          }
        }}
      >
        {!(isSigningUp || isLoggingIn || isUpdatingServer) ? t("sign") : "..."}
      </StyledButton>
    </div>
  );
};
export default AdminAccount;
