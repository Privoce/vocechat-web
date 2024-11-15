import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import BASE_URL, { KEY_LOCAL_MAGIC_TOKEN } from "@/app/config";
import {
  useLazyCheckEmailQuery,
  useRegisterMutation,
  useSendRegMagicLinkMutation
} from "@/app/services/auth";
import { useGetLoginConfigQuery } from "@/app/services/server";
import { setAuthData } from "@/app/slices/auth.data";
import { useAppSelector } from "@/app/store";
import Divider from "@/components/Divider";
import Button from "@/components/styled/Button";
import Input from "@/components/styled/Input";
import { isMobile } from "@/utils";
import SocialLoginButtons from "../login/SocialLoginButtons";
import EmailNextTip from "./EmailNextStepTip";
import { useMagicToken } from "./index";
import SignInLink from "./SignInLink";

interface AuthForm {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));
  const ctx = searchParams.get("ctx");
  const serverName = useAppSelector((store) => store.server.name, shallowEqual);
  const { t } = useTranslation("auth");
  const { t: ct } = useTranslation();
  const [sendRegMagicLink, { isLoading: signingUp, data, isSuccess }] =
    useSendRegMagicLinkMutation();
  const dispatch = useDispatch();
  const { token: magic_token } = useMagicToken();
  const [register, { isLoading: registering, data: regData, isSuccess: regSuccess }] =
    useRegisterMutation();
  const [checkEmail, { isLoading: checkingEmail }] = useLazyCheckEmailQuery();
  const { data: loginConfig, isSuccess: loginConfigSuccess } = useGetLoginConfigQuery();

  const navigateTo = useNavigate();
  const [input, setInput] = useState<AuthForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  if (magic_token) {
    //本地存一下 magic token 后续 oauth 流程用到
    localStorage.setItem(KEY_LOCAL_MAGIC_TOKEN, magic_token);
  }
  // 如果是移动端访问，并且没标识，则跳转
  useEffect(() => {
    if (ctx !== "web" && isMobile() && magic_token) {
      navigateTo(`/invite_mobile/${magic_token}`);
    }
  }, [ctx, magic_token]);

  // send reg link
  useEffect(() => {
    if (isSuccess && data) {
      const { new_magic_token, mail_is_sent } = data;
      if (!mail_is_sent && new_magic_token) {
        // 直接进入 set_name 流程
        navigateTo(`/register/set_name?magic_token=${new_magic_token}`);
      }
    }
  }, [isSuccess, data]);
  // register
  useEffect(() => {
    if (regSuccess && regData) {
      // 更新本地认证信息
      toast.success(ct("tip.reg"));
      dispatch(setAuthData(regData));
      // tricky
      location.reload();
      // location.href = `/#/`;
    }
  }, [regSuccess, regData]);

  const handleReg = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { name, email, password, confirmPassword } = input;
    if (password !== confirmPassword) {
      toast.error("Not Same Password!");
      return;
    }
    const { data: canReg } = await checkEmail(email);
    if (canReg) {
      if (magic_token) {
        sendRegMagicLink({
          magic_token,
          email,
          password
        });
      } else {
        // 带用户名的注册
        register({
          name,
          email,
          password
        });
      }
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
  if (!loginConfigSuccess) return null;
  const { who_can_sign_up: whoCanSignUp } = loginConfig;
  // magic token 没有并且没有开放注册
  if (whoCanSignUp !== "EveryOne" && !magic_token)
    // todo: i18n
    return (
      <span className="dark:text-white">Sign up method is updated to Invitation Link Only</span>
    );
  const { name, email, password, confirmPassword } = input;
  if (data?.mail_is_sent) return <EmailNextTip />;
  const isLoading = registering || signingUp || checkingEmail;

  return (
    <>
      <div className="flex-center flex-col pb-6">
        <img
          src={`${BASE_URL}/resource/organization/logo`}
          alt="logo"
          className="w-14 h-14 md:mb-7 rounded-full"
        />
        <h2 className="font-semibold text-center text-balance text-2xl text-gray-800 dark:text-white">
          {t("reg.title", { name: serverName })}
        </h2>
      </div>

      <form
        className="flex flex-col gap-5 md:min-w-[360px] w-full"
        onSubmit={handleReg}
        autoSave={"false"}
        autoComplete={"true"}
      >
        {/* 不存在 magic token */}
        {!magic_token && (
          <Input
            className="large"
            name="name"
            value={name}
            required
            type="name"
            placeholder={t("placeholder_name")}
            data-type="name"
            onChange={handleInput}
          />
        )}
        <Input
          className="large"
          name="email"
          value={email}
          required
          type="email"
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
          minLength={6}
          data-type="password"
          onChange={handleInput}
          placeholder={t("placeholder_pwd")}
        />
        <Input
          className="large"
          required
          onBlur={handleCompare}
          type="password"
          minLength={6}
          name={"confirmPassword"}
          value={confirmPassword}
          data-type="confirmPassword"
          onChange={handleInput}
          placeholder={t("placeholder_confirm_pwd")}
        ></Input>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t("signing_up") : t("sign_up")}
        </Button>
      </form>
      <Divider content="OR" />
      <div className="socials flex flex-col gap-3 py-3 empty:hidden">
        <SocialLoginButtons type="register" />
      </div>
      <SignInLink token={magic_token} />
    </>
  );
}
