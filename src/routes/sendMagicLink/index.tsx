import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../../app/config";
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import { useSendLoginMagicLinkMutation } from "../../app/services/auth";
import SentTip from "./SentTip";
import { useTranslation } from "react-i18next";
import SocialLoginButtons from "../login/SocialLoginButtons";
import Divider from "../../common/component/Divider";

export default function SendMagicLinkPage() {
  const { t } = useTranslation("auth");
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
    <div className="flex-center h-screen">
      <div className="py-8 px-10 shadow rounded-xl">
        {sent ? (
          <SentTip email={email} reset={handleReset} />
        ) : (
          <>
            <div className="flex flex-col items-center">
              <img src={`${BASE_URL}/resource/organization/logo`} alt="logo" className="w-14 h-14 mb-7 rounded-full" />
              <h2 className="font-semibold text-2xl text-gray-800 mb-2">{t("login.title")}</h2>
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
            <Divider content="or" />
            <div className="flex flex-col gap-3 py-3">
              <SocialLoginButtons />
            </div>
            <Button onClick={handlePwdPath} className="flex">{t("login.password")}</Button>
          </>
        )}
      </div>
    </div>
  );
}
