// import React from 'react'
import { FormEvent, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import { useLoginMutation, useRegisterMutation } from "../../../app/services/auth";
import { useGetLoginConfigQuery } from "../../../app/services/server";
import { setAuthData } from "../../../app/slices/auth.data";
import Divider from "../../../components/Divider";
import GithubLoginButton from "../../../components/GithubLoginButton";
import GoogleLoginButton from "../../../components/GoogleLoginButton";
import StyledButton from "../../../components/styled/Button";
import Input from "../../../components/styled/Input";
import useGithubAuthConfig from "../../../hooks/useGithubAuthConfig";
import useGoogleAuthConfig from "../../../hooks/useGoogleAuthConfig";
import { useWidget } from "../../WidgetContext";
import Loading from "@/components/Loading";

// type Props = {}
const randomText = () => (Math.random() + 1).toString(36).substring(7);
const Login = () => {
  const { t } = useTranslation("widget");
  const dispatch = useDispatch();
  const { color, fgColor, from, autoReg, token, id } = useWidget();
  const { clientId } = useGoogleAuthConfig();
  const { config: githubAuthConfig } = useGithubAuthConfig();
  const [register, { isLoading, isSuccess, data, error }] = useRegisterMutation();
  const [loginByToken, { isLoading: isLogging, isError: tokenLoginError }] = useLoginMutation();
  //  const [login]= useLoginMutation();
  const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();
  const registerUser = ({ name, email, auto }: { name: string; email: string; auto?: boolean }) => {
    const rand = randomText();
    const _name = auto ? name : `${name}-${rand}`;
    const _email = auto ? `${name}@${from}` : email;
    register({
      widget_id: id,
      name: _name,
      email: _email,
      password: `${_name}${_email}${rand}`
    });
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    // 检查格式
    if (!form?.checkValidity()) {
      form?.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = data.get("username") as string;
    const email = data.get("email") as string;
    // const email = data.get("email") as string;
    console.log("name", name);
    registerUser({ name, email, auto: false });
    // const content = new FormData(form).get("prompt") as string;
  };
  useEffect(() => {
    if (autoReg && !token) {
      registerUser({ name: `w-${randomText()}`, email: "", auto: true });
    } else if (token) {
      loginByToken({ key: token, type: "thirdparty" });
    }
  }, [autoReg, token]);

  useEffect(() => {
    if (tokenLoginError) {
      toast.error("Token login error!");
    }
  }, [tokenLoginError]);
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAuthData(data));
    }
  }, [isSuccess, data]);
  // 报错处理
  useEffect(() => {
    if (error) {
      switch (error.status) {
        case 409:
          toast.error("Email existed already!");
          // login({
          //   name: data?.name,
          //   email: data?.email,
          //   password
          // })
          break;
        default:
          toast.error("Something error!");
          break;
      }
    }
  }, [error]);
  if (!loginConfigSuccess) return null;
  if (autoReg || isLogging) return <Loading />;
  const { github: enableGithubLogin, google: enableGoogleLogin } = loginConfig;
  const googleLogin = enableGoogleLogin && clientId;
  const hasSocialLogins = enableGithubLogin || googleLogin;
  return (
    <div className="w-full max-w-[288px] flex flex-col gap-2 mt-4 animate-[fadeInUp_.5s_.8s_ease-in-out_both]">
      <div className="bg-white dark:bg-gray-700 border dark:border-gray-500 rounded-lg">
        <form className="px-4 py-3 flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* input email as username */}
          <Input required placeholder="Name" type="text" name="username" />
          <Input required placeholder="Email" type="email" name="email" />
          <StyledButton
            style={{ backgroundColor: color, color: fgColor }}
            disabled={isLoading}
            type="submit"
            className={clsx("small")}
          >
            {t("start_chat")}
          </StyledButton>
          {hasSocialLogins && <Divider content="OR" />}
          {googleLogin && <GoogleLoginButton clientId={clientId} />}
          {enableGithubLogin && (
            <GithubLoginButton client_id={githubAuthConfig?.client_id} source="widget" />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
