/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { setAuthData } from "../../app/slices/auth.data";

import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import {
  useLoginMutation,
  useCheckInviteTokenValidMutation,
} from "../../app/services/auth";
import toast from "react-hot-toast";
import ExpiredTip from "./ExpiredTip";

export default function RegWithUsername() {
  const { token } = useParams();
  const [
    checkTokenInvalid,
    { data: isTokenValid, isLoading: checkingToken },
  ] = useCheckInviteTokenValidMutation();
  const [login, { isLoading, error, isSuccess, data }] = useLoginMutation();
  // const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
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
    if (isSuccess && data) {
      // 更新本地认证信息
      console.log("login data", data);
      toast.success("Login Successfully");
      dispatch(setAuthData(data));
      location.href = `/#/`;
    }
  }, [isSuccess, data]);

  const handleLogin = (evt) => {
    evt.preventDefault();
    login({
      token,
      username,
      type: "magiclink",
    });
    // sendMagicLink(email);
  };

  const handleInput = (evt) => {
    const { value } = evt.target;
    setUsername(value);
  };
  if (!token) return "no token";
  if (checkingToken) return "checking Magic Link...";
  if (!isTokenValid) return <ExpiredTip />;
  return (
    <>
      <div className="tips">
        <h2 className="title">What’s your name</h2>
        <span className="desc">
          Enter a name or handle so people know how you’d like to be called.
          Your name will only be visible to others in spaces you joined.
        </span>
      </div>
      <form onSubmit={handleLogin}>
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
