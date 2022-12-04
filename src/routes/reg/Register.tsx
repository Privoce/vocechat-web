import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import BASE_URL, { KEY_LOCAL_MAGIC_TOKEN } from "../../app/config";
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import { useLazyCheckEmailQuery, useSendRegMagicLinkMutation } from "../../app/services/auth";
import EmailNextTip from "./EmailNextStepTip";
import SignInLink from "./SignInLink";
import { useGetLoginConfigQuery } from "../../app/services/server";
import useGithubAuthConfig from "../../common/hook/useGithubAuthConfig";
import useGoogleAuthConfig from "../../common/hook/useGoogleAuthConfig";
import GoogleLoginButton from "../../common/component/GoogleLoginButton";
import GithubLoginButton from "../../common/component/GithubLoginButton";
import { useTranslation } from "react-i18next";

interface AuthForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Reg() {
  const { t } = useTranslation("auth");
  const [sendRegMagicLink, { isLoading: signingUp, data, isSuccess }] =
    useSendRegMagicLinkMutation();
  const [checkEmail, { isLoading: checkingEmail }] = useLazyCheckEmailQuery();
  // const navigateTo = useNavigate();
  const [magicToken, setMagicToken] = useState("");
  const [input, setInput] = useState<AuthForm>({
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("magic_token");
    if (token) {
      //本地存一下 magic token 后续oauth流程用到
      localStorage.setItem(KEY_LOCAL_MAGIC_TOKEN, token);
      setMagicToken(token);
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      const { new_magic_token, mail_is_sent } = data;
      if (!mail_is_sent && new_magic_token) {
        // 直接进入set_name流程
        location.href = `?magic_token=${new_magic_token}#/register/set_name`;
      }
    }
  }, [isSuccess, data]);

  const handleReg = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { email, password, confirmPassword } = input;
    if (password.length < 6) {
      toast.error("Password greater than 6!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Not Same Password!");
      return;
    }
    const { data: canReg } = await checkEmail(email);
    if (canReg) {
      sendRegMagicLink({
        magic_token: magicToken,
        email,
        password
      });
    } else {
      toast.error("Email already registered!");
    }
    // sendMagicLink(email);
  };

  const handleCompare = () => {
    const { password, confirmPassword } = input;
    if (password !== confirmPassword) {
      toast.error("Not Same Password!");
    }
  };

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { type } = evt.target.dataset as { type: keyof AuthForm };
    const { value } = evt.target;
    setInput((prev) => {
      prev[type] = value;
      return { ...prev };
    });
  };

  const { clientId } = useGoogleAuthConfig();
  const { config: githubAuthConfig } = useGithubAuthConfig();
  const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();
  if (!loginConfigSuccess) return null;
  const {
    github: enableGithubLogin,
    google: enableGoogleLogin,
    who_can_sign_up: whoCanSignUp
  } = loginConfig;
  const googleLogin = enableGoogleLogin && clientId;
  // magic token 没有并且没有开放注册
  if (whoCanSignUp !== "EveryOne" && !magicToken)
    return <>Sign up method is updated to Invitation Link Only</>;
  const { email, password, confirmPassword } = input;
  if (data?.mail_is_sent) return <EmailNextTip />;
  const isLoading = signingUp || checkingEmail;

  return (
    <>
      <div className="tips">
        <img src={`${BASE_URL}/resource/organization/logo`} alt="logo" className="logo" />
        <h2 className="title">{t("reg.title")}</h2>
        <span className="desc">{t("reg.desc")}</span>
      </div>

      <form onSubmit={handleReg} autoSave={"false"} autoComplete={"true"}>
        <Input
          className="large"
          name="email"
          value={email}
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
        <Input
          required
          onBlur={handleCompare}
          type="password"
          name={"confirmPassword"}
          value={confirmPassword}
          data-type="confirmPassword"
          onChange={handleInput}
          placeholder={t("placeholder_confirm_pwd")}
        ></Input>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up" : t("sign_up")}
        </Button>
      </form>
      <hr className="or" />
      <div className="flex flex-col gap-3">
        {googleLogin && <GoogleLoginButton type="register" clientId={clientId} />}
        {enableGithubLogin && (
          <GithubLoginButton type="register" client_id={githubAuthConfig?.client_id} />
        )}
      </div>
      <SignInLink token={magicToken} />
    </>
  );
}
