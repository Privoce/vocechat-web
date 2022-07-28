import { useState, useEffect, FormEvent, ChangeEvent, FC } from "react";
import StyledWrapper from "./styled";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../../app/config";
import { useRegisterMutation } from "../../app/services/auth";
import { useCheckMagicTokenValidMutation } from "../../app/services/auth";
import { useAppSelector } from "../../app/store";

interface AuthForm {
  name: string;
  email: string;
  password: string;
}

const InvitePage: FC = () => {
  const { token: loginToken } = useAppSelector((store) => store.authData);
  const [secondPwd, setSecondPwd] = useState("");
  const [samePwd, setSamePwd] = useState(true);
  const [token, setToken] = useState<string | null>("");
  const [valid, setValid] = useState(false);
  const [register, { data, isLoading, isSuccess, isError, error }] = useRegisterMutation();
  const [checkToken, { data: isValid, isLoading: checkLoading, isSuccess: checkSuccess }] =
    useCheckMagicTokenValidMutation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setToken(query.get("token"));
  }, []);

  useEffect(() => {
    if (token) {
      checkToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (checkSuccess) {
      setValid(!!isValid);
    } else {
      setValid(false);
    }
  }, [checkSuccess, isValid]);

  const [input, setInput] = useState<AuthForm>({ name: "", email: "", password: "" });

  const handleReg = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!samePwd) {
      toast.error("two passwords not same");
      return;
    }
    register({
      ...input,
      magic_token: token,
      gender: 1
    });
  };

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { type } = evt.target.dataset as { type: keyof AuthForm };
    const { value } = evt.target;
    setInput((prev) => {
      prev[type] = value;
      return { ...prev };
    });
  };

  const handleSecondPwdInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setSecondPwd(value);
  };

  const handlePwdCheck = () => {
    if (secondPwd) {
      setSamePwd(secondPwd == input.password);
    }
  };

  useEffect(() => {
    if (!samePwd) {
      toast.error("two passwords not same");
    }
  }, [samePwd]);

  useEffect(() => {
    if (isSuccess && data) {
      // 去登录
      toast.success("register success, login please");
      setTimeout(() => {
        location.href = `/#/login`;
        // navigateTo("/login",);
      }, 500);
    } else if (isError && error && "data" in error) {
      switch (error.status) {
        case 400:
          toast.error("Register Failed: please check inputs");
          break;
        case 412:
          toast.error("Register Failed: invalid token or expired");
          break;
        case 409: {
          toast.error(`Register Failed: ${error.data?.reason}`);
          break;
        }
        default:
          toast.error("Register Failed");
          break;
      }
    }
  }, [data, isSuccess, isError, error]);

  const { email, password, name } = input;
  if (loginToken) return <Navigate replace to="/" />;
  if (!token) return <>token not found</>;
  if (checkLoading) return <>checking token valid</>;
  if (!valid) return <>invite token expires or invalid</>;

  return (
    <StyledWrapper>
      <div className="form animate__animated animate__fadeInDown animate__faster">
        <div className="tips">
          <img src={`${BASE_URL}/resource/organization/logo`} alt="logo" className="logo" />
          <h2 className="title">Sign Up to VoceChat</h2>
          <span className="desc">Please enter your details.</span>
        </div>
        <form onSubmit={handleReg}>
          <input
            name="name"
            value={name}
            required
            placeholder="Enter your name"
            data-type="name"
            onChange={handleInput}
          />
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
          <input
            type="password"
            value={secondPwd}
            name="password"
            required
            data-type="password"
            onBlur={handlePwdCheck}
            onChange={handleSecondPwdInput}
            placeholder="Enter your password again"
          />
          <button disabled={isLoading || isSuccess} className="btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
};

export default InvitePage;
