import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../app/config";
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import { useSendRegMagicLinkMutation } from "../../app/services/auth";
import EmailNextTip from "./EmailNextStepTip";
import SignInLink from "./SignInLink";
import { useGetLoginConfigQuery } from "../../app/services/server";
import useGithubAuthConfig from "../../common/hook/useGithubAuthConfig";
import useGoogleAuthConfig from "../../common/hook/useGoogleAuthConfig";
import GoogleLoginButton from "../../common/component/GoogleLoginButton";
import GithubLoginButton from "../../common/component/GithubLoginButton";

export default function Reg() {
  const [sendRegMagicLink, { isLoading, data, isSuccess }] = useSendRegMagicLinkMutation();
  const navigateTo = useNavigate();
  const [magicToken, setMagicToken] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    // const githubCode = query.get("gcode");
    const token = query.get("magic_token");
    if (token) {
      setMagicToken(token);
    }
  }, []);
  useEffect(() => {
    if (isSuccess && data) {
      const { new_magic_token, mail_is_sent } = data;
      if (!mail_is_sent && new_magic_token) {
        // 直接进入set_name流程
        navigateTo(`?magic_token=${new_magic_token}#/register/set_name`);
      }
    }
  }, [isSuccess, data]);

  const handleReg = (evt) => {
    evt.preventDefault();
    const { email, password } = input;
    sendRegMagicLink({
      magic_token: magicToken,
      email,
      password
    });
    // sendMagicLink(email);
  };
  const handleCompare = () => {
    const { password, confirmPassword } = input;
    if (password !== confirmPassword) {
      toast.error("Not Same Password!");
    }
  };
  const handleInput = (evt) => {
    const { type } = evt.target.dataset;
    const { value } = evt.target;
    // console.log(type, value);
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
  // 没有开放注册
  if (whoCanSignUp !== "EveryOne") return `Open Register is Closed!`;
  const { email, password, confirmPassword } = input;
  if (data?.mail_is_sent) return <EmailNextTip />;
  return (
    <>
      <div className="tips">
        <img src={`${BASE_URL}/resource/organization/logo`} alt="logo" className="logo" />
        <h2 className="title">Sign Up to Rustchat</h2>
        <span className="desc">Please enter your details.</span>
      </div>

      <form onSubmit={handleReg}>
        <Input
          className="large"
          name="email"
          value={email}
          required
          placeholder="Enter email"
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
          placeholder="Enter password"
        />
        <Input
          onBlur={handleCompare}
          type="password"
          name={"confirmPassword"}
          value={confirmPassword}
          data-type="confirmPassword"
          onChange={handleInput}
          placeholder="Confirm Password"
        ></Input>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up" : `Sign Up`}
        </Button>
      </form>
      <hr className="or" />
      {googleLogin && <GoogleLoginButton clientId={clientId} />}
      {enableGithubLogin && <GithubLoginButton config={githubAuthConfig} />}
      <SignInLink />
    </>
  );
}
