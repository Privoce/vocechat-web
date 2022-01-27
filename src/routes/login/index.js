import { useState } from "react";
import StyledWrapper from "./styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useLoginMutation } from "../../app/services/auth";
import { setAuthData } from "../../app/slices/auth.data";

export default function LoginPage() {
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
      device: "web",
      device_token: "test",
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
      dispatch(setAuthData(data));
      toast.success("login success");
      navigateTo("/");
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
        <form onSubmit={handleLogin}>
          <input
            name="email"
            value={email}
            required
            placeholder="email"
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
            placeholder="password"
          />
          <button type="submit">login</button>
        </form>
      </div>
    </StyledWrapper>
  );
}
