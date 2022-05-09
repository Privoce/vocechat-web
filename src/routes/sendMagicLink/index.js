/* eslint-disable no-undef */
import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../../app/config";
import StyledWrapper from "./styled";
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import { useSendMagicLinkMutation } from "../../app/services/auth";

export default function SendMagicLinkPage() {
  const [
    sendMagicLink,
    { isSuccess, isLoading, error },
  ] = useSendMagicLinkMutation();
  // const navigateTo = useNavigate();
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (isSuccess) {
      toast.success("Send Email Successfully!");
    }
  }, [isSuccess]);

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

  const handleLogin = (evt) => {
    evt.preventDefault();
    sendMagicLink(email);
  };

  const handleInput = (evt) => {
    const { value } = evt.target;
    console.log(value);
    setEmail(value);
  };
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
          <span className="desc">Please enter your Email</span>
        </div>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            className="large"
            name="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={handleInput}
          />
          <Button type="submit" disabled={isLoading || !email}>
            {isLoading ? "Sending" : `Continue with Email`}
          </Button>
        </form>
      </div>
    </StyledWrapper>
  );
}
