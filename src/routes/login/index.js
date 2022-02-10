import { useState } from "react";
import StyledWrapper from "./styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useLoginMutation } from "../../app/services/auth";
import { setAuthData } from "../../app/slices/auth.data";

export default function LoginPage() {
  // const { token } = useSelector((store) => store.authData);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (evt) => {
    evt.preventDefault();
    console.log("wtf", input);
    const { data, error } = await login({
      ...input,
      type: "password",
    });
    if (error) {
      console.log(error);
      switch (error.status) {
        case 401:
          toast.error("username or password incorrect");
          break;

        default:
          break;
      }
      return;
    }
    if (data) {
      // 更新本地认证信息
      toast.success("login success");
      dispatch(setAuthData(data));
      navigateTo("/");
      // location.reload(true);
    }
  };
  const handleInput = (evt) => {
    const { type } = evt.target.dataset;
    const { value } = evt.target;
    console.log(type, value);
    setInput((prev) => {
      prev[type] = value;
      return { ...prev };
    });
  };
  const { email, password } = input;
  return (
    <StyledWrapper>
      <div className="form">
        <div className="tips">
          <img
            src="https://static.nicegoodthings.com/project/ext/webrowse.logo.png"
            alt="logo"
            className="logo"
          />
          <h2 className="title">Login to Rustchat</h2>
          <span className="desc">Please enter your details.</span>
        </div>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            value={email}
            required
            placeholder="Enter your email"
            data-type="email"
            onChange={handleInput}
          />
          <input
            type="password"
            value={password}
            name="password"
            required
            data-type="password"
            onChange={handleInput}
            placeholder="Enter your password"
          />
          <button className="btn" type="submit">
            Sign in
          </button>
        </form>
        <hr className="or" />
        <a href="#" className="btn google">
          Sign in with Google
        </a>
      </div>
    </StyledWrapper>
  );
}
