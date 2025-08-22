import { FC, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { KEY_LOCAL_MAGIC_TOKEN } from "@/app/config";
import { useLoginMutation } from "@/app/services/auth";
import StyledButton from "../../components/styled/Button";

export type GithubLoginSource = "widget" | "webapp";
type Props = {
  code: string;
  from?: GithubLoginSource;
};

const GithubCallback: FC<Props> = ({ code, from = "webapp" }) => {
  const { t } = useTranslation("auth");
  const { t: ct } = useTranslation();

  // 使用 ref 来防止重复调用
  const hasTriedLogin = useRef(false);

  const [login, { isLoading, isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    // 防止重复调用登录
    if (code && !hasTriedLogin.current && !isLoading && !isSuccess) {
      const magic_token = localStorage.getItem(KEY_LOCAL_MAGIC_TOKEN);
      hasTriedLogin.current = true;

      login({
        magic_token,
        code,
        type: "github",
      });
    }
  }, [code, login, isLoading, isSuccess]); // 完整的依赖项列表

  useEffect(() => {
    if (isSuccess || from == "webapp") {
      toast.success(ct("tip.login"));

      // 通知 widget
      if (from === "widget") {
        localStorage.setItem("widget", `${new Date().getTime()}`);
      }

      // webapp 跳回首页
      if (from === "webapp") {
        location.href = "/";
      }
    }
  }, [isSuccess, from, ct]);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);

  //     switch ((error as FetchBaseQueryError).status) {
  //       case 410:
  //         toast.error(
  //           "No associated account found, please contact user admin for an invitation link to join."
  //         );
  //         break;
  //       default:
  //         {
  //           console.log("login error");
  //           // toast.error("Something Error");
  //         }
  //         break;
  //     }
  //   }
  // }, [error]);

  const handleClose = () => {
    window.close();
  };

  // if (error) {
  //   return <span className="text-red-500 text-lg">Something Error</span>;
  // }

  return (
    <section className="flex-center flex-col gap-3">
      <StyledButton onClick={handleClose}>{ct("action.close")}</StyledButton>
      {isSuccess && from === "widget" && <h1>{t("github_cb_tip")}</h1>}
      <span className="text-3xl text-green-600 font-bold">
        {isLoading ? t("github_logging_in") : t("github_login_success")}
      </span>
    </section>
  );
};

export default GithubCallback;
