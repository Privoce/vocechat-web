/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../../app/config";
// import web3 from "web3";
import StyledWrapper from "./styled";
import MetamaskLoginButton from "./MetamaskLoginButton";
import SolidLoginButton from "./SolidLoginButton";
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import GoogleLoginButton from "./GoogleLoginButton";
import MagicLinkLogin from "./MagicLinkLogin";
import { useLoginMutation } from "../../app/services/auth";
import { useGetLoginConfigQuery } from "../../app/services/server";
import { setAuthData } from "../../app/slices/auth.data";
import useGoogleAuthConfig from "../../common/hook/useGoogleAuthConfig";
export default function LoginPage() {
  const [login, { data, isSuccess, isLoading, error }] = useLoginMutation();
  const { clientId } = useGoogleAuthConfig();
  const {
    data: loginConfig,
    isSuccess: loginConfigSuccess,
  } = useGetLoginConfigQuery(undefined, { pollingInterval: 10000 });
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");
    const token = query.get("token");
    const exists = query.get("exists");
    // oidc login
    if (code && state) {
      login({
        code,
        state,
        type: "oidc",
      });
    }
    // magic link
    if (token && typeof exists !== "undefined") {
      console.log("tokken", token, exists);
      const isLogin = exists == "true";
      if (isLogin) {
        // login
        login({
          token,
          type: "magiclink",
        });
      } else {
        // reg
        location.href = `/#/reg/magiclink/${token}`;
      }
    }
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error);
      switch (error.status) {
        case "PARSING_ERROR":
          toast.error(error.data);
          break;
        case 401:
          toast.error("username or password incorrect");
          break;
        case 404:
          toast.error("account not exsit");
          break;
        default:
          toast.error("something error");
          break;
      }
      return;
    }
  }, [error]);
  useEffect(() => {
    if (isSuccess && data) {
      // 更新本地认证信息
      console.log("login data", data);
      toast.success("Login Successfully");
      dispatch(setAuthData(data));
      navigateTo("/");
    }
  }, [isSuccess, data]);

  const handleLogin = (evt) => {
    evt.preventDefault();
    console.log("wtf", input);
    login({
      ...input,
      type: "password",
    });
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
  const { email, password } = input;
  if (!loginConfigSuccess) return null;
  const {
    google: enableGoogleLogin,
    metamask: enableMetamaskLogin,
    oidc,
  } = loginConfig;
  const googleLogin = enableGoogleLogin && clientId;
  return (
    <StyledWrapper>
      <div className="form">
        <div className="tips">
          <img
            src={`${BASE_URL}/resource/organization/logo`}
            alt="logo"
            className="logo"
          />
          <h2 className="title">Login to Rustchat</h2>
          <span className="desc">Please enter your details.</span>
        </div>
        <form onSubmit={handleLogin}>
          <Input
            className="large"
            name="email"
            value={email}
            required
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing" : `Sign in`}
          </Button>
        </form>
        {(googleLogin || enableMetamaskLogin || oidc.length > 0) && (
          <hr className="or" />
        )}
        <MagicLinkLogin />
        {googleLogin && <GoogleLoginButton login={login} clientId={clientId} />}
        {enableMetamaskLogin && <MetamaskLoginButton login={login} />}
        {oidc.length > 0 && <SolidLoginButton issuers={oidc} />}
      </div>
    </StyledWrapper>
  );
}
