/* eslint-disable no-undef */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import BASE_URL from "@/app/config";
import { useLoginMutation } from "@/app/services/auth";
import { useGetLoginConfigQuery, useGetSMTPStatusQuery } from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import Divider from "@/components/Divider";
import Button from "@/components/styled/Button";
import Input from "@/components/styled/Input";
import MagicLinkLogin from "./MagicLinkLogin";
import SignUpLink from "./SignUpLink";
import SocialLoginButtons from "./SocialLoginButtons";

export default function LoginPage() {
  const serverName = useAppSelector((store) => store.server.name);
  const { t } = useTranslation("auth");
  const { t: ct } = useTranslation();
  const { data: enableSMTP, isLoading: loadingSMTPStatus } = useGetSMTPStatusQuery();
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
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
        // navigate(`/register/set_name/login?magic_token=${magic_token}`);
        location.href = `/#/register/set_name/login?magic_token=${magic_token}`;
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

  const { magic_link, who_can_sign_up: whoCanSignUp } = loginConfig;

  const enableMagicLink = enableSMTP && magic_link;

  if (loadingSMTPStatus) return null;
  return (
    <div className="flex-center h-screen dark:bg-gray-700">
      <div className="py-8 px-10 shadow-md rounded-xl">
        <div className="flex-center flex-col pb-6">
          <img
            src={`${BASE_URL}/resource/organization/logo`}
            alt="logo"
            className="w-14 h-14 mb-3 md:mb-7 rounded-full"
          />
          <h2 className="font-semibold text-2xl text-gray-800 dark:text-white">
            {t("login.title", { name: serverName })}
          </h2>
        </div>
        <form className="flex flex-col gap-5 w-80 md:min-w-[360px] " onSubmit={handleLogin}>
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
        <Divider content="OR" />
        <div className="socials flex flex-col gap-3">
          {enableMagicLink && <MagicLinkLogin />}
          <SocialLoginButtons />
        </div>
        {whoCanSignUp === "EveryOne" && <SignUpLink />}
      </div>
    </div>
  );
}
