/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAuthData } from "../../app/slices/auth.data";

import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import { useLoginMutation, useCheckMagicTokenValidMutation } from "../../app/services/auth";
import toast from "react-hot-toast";
import ExpiredTip from "./ExpiredTip";
import { useRegisterMutation } from "../../app/services/auth";

export default function RegWithUsername() {
  const [checkTokenInvalid, { data: isTokenValid, isLoading: checkingToken }] =
    useCheckMagicTokenValidMutation();
  const [login, { isLoading: loginLoading, error, isSuccess: loginSuccess, data: loginData }] =
    useLoginMutation();
  const [register, { isLoading: regLoading, isSuccess: regSuccess, data: regData }] =
    useRegisterMutation();
  // const navigateTo = useNavigate();
  const { from = "reg" } = useParams();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const query = new URLSearchParams(location.search);
  // const githubCode = query.get("gcode");
  const token = query.get("magic_token");
  useEffect(() => {
    if (token) {
      checkTokenInvalid(token);
    }
  }, [token]);

  useEffect(() => {
    console.log("errr", error);
    switch (error?.status) {
      case 401:
        toast.error("Invalided Token");
        break;

      default:
        break;
    }
  }, [error]);
  useEffect(() => {
    const isSuccess = loginSuccess || regSuccess;
    const data = loginData || regData;
    if (isSuccess && data) {
      // 更新本地认证信息
      toast.success("Login Successfully");
      dispatch(setAuthData(data));
      // tricky
      location.href = `/#/`;
    }
  }, [loginSuccess, regSuccess, loginData, regData]);

  const handleAuth = (evt) => {
    evt.preventDefault();
    if (from == "reg") {
      register({
        magic_token: token,
        name: username
      });
    } else {
      login({
        magic_token: token,
        extra_name: username,
        type: "magiclink"
      });
    }
  };

  const handleInput = (evt) => {
    const { value } = evt.target;
    setUsername(value);
  };
  if (!token) return "No Token";
  if (checkingToken) return "Checking Magic Link...";
  if (!isTokenValid) return <ExpiredTip />;
  const isLoading = loginLoading || regLoading;
  const isSuccess = loginSuccess || regSuccess;
  return (
    <>
      <div className="tips">
        <h2 className="title">What’s your name</h2>
        <span className="desc">
          Enter a name or handle so people know how you’d like to be called. Your name will only be
          visible to others in spaces you joined.
        </span>
      </div>
      <form onSubmit={handleAuth}>
        <Input
          className="large"
          name="username"
          value={username}
          required
          placeholder="Type a name"
          onChange={handleInput}
        />
        <Button type="submit" disabled={isLoading || !username || isSuccess}>
          {isLoading ? "Logining" : `Continue`}
        </Button>
      </form>
    </>
  );
}
