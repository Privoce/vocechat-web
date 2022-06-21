import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common/component/styled/Input";
import Button from "../../common/component/styled/Button";
import { useSendRegMagicLinkMutation } from "../../app/services/auth";
import EmailNextTip from "./EmailNextStepTip";

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

  const handleReg = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { email, password } = input;
    sendRegMagicLink({
      magic_token: magicToken,
      email,
      password
    });
    // sendMagicLink(email);
  };

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { type } = evt.target.dataset;
    const { value } = evt.target;
    // console.log(type, value);
    setInput((prev) => {
      prev[type] = value;
      return { ...prev };
    });
  };

  const { email, password } = input;
  if (data?.mail_is_sent) return <EmailNextTip />;
  return (
    <form onSubmit={handleReg}>
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
        {isLoading ? "Signing Up" : `Sign Up`}
      </Button>
    </form>
  );
}
