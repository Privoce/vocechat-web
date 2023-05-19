import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import BASE_URL from "@/app/config";
import { useSendLoginMagicLinkMutation } from "@/app/services/auth";
import { useAppSelector } from "@/app/store";
import Divider from "@/components/Divider";
import Button from "@/components/styled/Button";
import Input from "@/components/styled/Input";
import SocialLoginButtons from "../login/SocialLoginButtons";
import SignInLink from "../reg/SignInLink";
import SentTip from "./SentTip";

export default function SendMagicLinkPage() {
  const { t } = useTranslation("auth");
  const serverName = useAppSelector((store) => store.server.name);
  const [sent, setSent] = useState(false);
  const [sendMagicLink, { isSuccess, isLoading, error }] = useSendLoginMagicLinkMutation();
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Send Email Successfully!");
      setSent(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "status" in error) {
      switch (error.status) {
        case "PARSING_ERROR":
          toast.error(error.data);
          break;
        case 401:
          toast.error("Username or Password Incorrect");
          break;
        case 404:
          toast.error("Account not exist");
          break;
        default:
          toast.error("Something Error");
          break;
      }
      return;
    }
  }, [error]);

  const handlePwdPath = () => {
    navigateTo("/login");
  };

  const handleLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    sendMagicLink(email);
  };

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setEmail(value);
  };

  const handleReset = () => {
    setEmail("");
    setSent(false);
  };
  return (
    <div className="flex-center h-screen dark:bg-gray-700">
      <div className="py-8 px-10 shadow rounded-xl">
        {sent ? (
          <SentTip email={email} reset={handleReset} />
        ) : (
          <>
            <div className="flex flex-col items-center">
              <img
                src={`${BASE_URL}/resource/organization/logo`}
                alt="logo"
                className="w-14 h-14 mb-7 rounded-full"
              />
              <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 mb-2">
                {t("enter")} {serverName}{" "}
              </h2>
              <span className="text-center text-gray-500 mb-6">{t("placeholder_email")}</span>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-5 w-[360px]">
              <Input
                type="email"
                className="large"
                name="email"
                autoFocus
                value={email}
                required
                // pattern={`^\S+@\S+\.\S+$`}
                placeholder={t("placeholder_email")}
                onChange={handleInput}
              />
              <Button type="submit" disabled={isLoading || !email}>
                {isLoading ? "Sending" : t("continue")}
              </Button>
            </form>
            <Divider content="OR" />
            <Button onClick={handlePwdPath} className="w-full">
              {t("login.password")}
            </Button>
            <div className="flex flex-col gap-3 py-3">
              <SocialLoginButtons />
            </div>
            <SignInLink />
          </>
        )}
      </div>
    </div>
  );
}
