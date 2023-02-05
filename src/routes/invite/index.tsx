import { useState, useEffect, FormEvent, ChangeEvent, FC } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../../app/config";
import { useRegisterMutation } from "../../app/services/auth";
import { useCheckMagicTokenValidMutation } from "../../app/services/auth";
import { useAppSelector } from "../../app/store";
import StyledButton from "../../common/component/styled/Button";
import Input from "../../common/component/styled/Input";

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
    <div className="flex-center h-screen dark:bg-[#384250]">
      <div className="py-8 px-10 shadow-md rounded-xl">
        <div className="flex-center flex-col pb-6">
          <img src={`${BASE_URL}/resource/organization/logo`} alt="logo" className="w-14 h-14 mb-7 rounded-full" />
          <h2 className="font-semibold text-2xl text-gray-800 dark:text-white mb-2">Sign Up to VoceChat</h2>
          <span className="text-gray-400 dark:text-gray-100">Please enter your details.</span>
        </div>
        <form className="flex flex-col gap-5 min-w-[360px]" onSubmit={handleReg}>
          <Input
            className="large"
            name="name"
            value={name}
            required
            placeholder="Enter your name"
            data-type="name"
            onChange={handleInput}
          />
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
          <Input
            className="large"
            type="password"
            value={secondPwd}
            name="password"
            required
            data-type="password"
            onBlur={handlePwdCheck}
            onChange={handleSecondPwdInput}
            placeholder="Enter your password again"
          />
          <StyledButton disabled={isLoading || isSuccess} className="flex justify-center" type="submit">
            Sign Up
          </StyledButton>
        </form>
      </div>
    </div>
  );
};

export default InvitePage;
