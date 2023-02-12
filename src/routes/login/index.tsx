/* eslint-disable no-undef */
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import BASE_URL from "../../app/config";
// import web3 from "web3";

import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import MagicLinkLogin from "./MagicLinkLogin";
import SignUpLink from "./SignUpLink";
import { useLoginMutation } from "../../app/services/auth";
import { useGetLoginConfigQuery, useGetSMTPStatusQuery } from "../../app/services/server";
import useGoogleAuthConfig from "../../common/hook/useGoogleAuthConfig";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useTranslation } from "react-i18next";
import SocialLoginButtons from "./SocialLoginButtons";
import Divider from "../../common/component/Divider";

export default function LoginPage() {
  const { t } = useTranslation("auth");
  const { t: ct } = useTranslation();
  const { data: enableSMTP } = useGetSMTPStatusQuery();
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  const { clientId } = useGoogleAuthConfig();
  const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");
    const magic_token = query.get("magic_token");
    const exists = query.get("exists");
    // oidc
    const fromOIDC = code && state;
    if (fromOIDC) {
      login({
        code,
        state,
        type: "oidc"
      });
    }
    // magic link
    if (magic_token && typeof exists !== "undefined") {
      const isLogin = exists == "true";
      if (isLogin) {
        // login
        login({
          magic_token,
          type: "magiclink"
        });
      } else {
        // reg with magic link and set name only
        location.href = `?magic_token=${magic_token}#/register/set_name/login`;
      }
    }
  }, []);

  useEffect(() => {
    if (error) {
      switch ((error as FetchBaseQueryError).status) {
        case 401:
        case 404:
          toast.error("Username or Password incorrect");
          break;
        case 410:
          toast.error(
            "No associated account found, please contact user admin for an invitation link to join."
          );
          break;
        // 451有解析错误，暂时先客户端处理
        case "PARSING_ERROR":
          break;
        default:
          toast.error("Something Error");
          break;
      }
      return;
    }
  }, [error]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(ct("tip.login"));
      // navigateTo("/");
    }
  }, [isSuccess]);

  const handleLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    login({
      ...input,
      type: "password"
    });
  };

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { type } = evt.target.dataset as { type?: "email" | "password" };
    const { value } = evt.target;
    if (!type) return;
    setInput((prev) => {
      prev[type] = value;
      return { ...prev };
    });
  };
  const { email, password } = input;
  if (!loginConfigSuccess) return null;

  const {
    magic_link,
    github: enableGithubLogin,
    google: enableGoogleLogin,
    metamask: enableMetamaskLogin,
    oidc = [],
    who_can_sign_up: whoCanSignUp
  } = loginConfig;

  const enableMagicLink = enableSMTP && magic_link;
  const googleLogin = enableGoogleLogin && clientId;
  const hasDivider =
    enableMagicLink || googleLogin || enableMetamaskLogin || oidc.length > 0 || enableGithubLogin;


  return (
    <div className="flex-center h-screen dark:bg-[#384250]">
      <div className="py-8 px-10 shadow-md rounded-xl">
        <div className="flex-center flex-col pb-6">
          <img src={`${BASE_URL}/resource/organization/logo`} alt="logo" className="w-14 h-14 mb-3 md:mb-7 rounded-full" />
          <h2 className="font-semibold text-2xl text-gray-800 dark:text-white md:mb-2">{t("login.title")}</h2>
          <span className="text-gray-400 dark:text-gray-100">{t("login.desc")}</span>
        </div>
        <form className="flex flex-col gap-5 w-[320px] md:min-w-[360px] " onSubmit={handleLogin}>
          <Input
            className="large"
            name="email"
            value={email}
            type="email"
            required
            placeholder={t("placeholder_email")}
            data-type="email"
            onChange={handleInput}
          />
          <Input
            className="large"
            type="password"
            value={password}
            name="password"
            required
            data-type="password"
            onChange={handleInput}
            placeholder={t("placeholder_pwd")}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing" : t("sign_in")}
          </Button>
        </form>
        {hasDivider && <Divider content="OR" />}
        <div className="flex flex-col gap-4">

          {enableMagicLink && <MagicLinkLogin />}

          <SocialLoginButtons />
        </div>
        {whoCanSignUp === "EveryOne" && <SignUpLink smtp={enableSMTP} />}
      </div>
    </div>
  );
}
