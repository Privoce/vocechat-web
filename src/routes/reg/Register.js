/* eslint-disable no-undef */
import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
// import { useSendMagicLinkMutation } from "../../app/services/auth";

export default function Reg() {
  // const [
  //   sendMagicLink,
  //   { data, isSuccess, isLoading, error },
  // ] = useSendMagicLinkMutation();
  // const navigateTo = useNavigate();
  // const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const handleLogin = (evt) => {
    evt.preventDefault();
    // sendMagicLink(email);
  };

  const handleInput = (evt) => {
    const { value } = evt.target;
    console.log(value);
    setUsername(value);
  };
  return (
    <form onSubmit={handleLogin}>
      <Input
        className="large"
        name="username"
        value={username}
        required
        placeholder="Enter your Name22"
        onChange={handleInput}
      />
      <Button type="submit">{isLoading ? "Sending" : `Register`}</Button>
    </form>
  );
}
