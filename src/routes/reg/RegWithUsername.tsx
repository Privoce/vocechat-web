import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useLoginMutation, useRegisterMutation } from "@/app/services/auth";
import { setAuthData } from "@/app/slices/auth.data";
import Button from "@/components/styled/Button";
import Input from "@/components/styled/Input";
import { useMagicToken } from "./index";

const RegWithUsername: FC = () => {
  const { t: ct } = useTranslation();
  const { t } = useTranslation("auth");
  const { token } = useMagicToken();
  const [
    login,
    { isLoading: loginLoading, error: loginError, isSuccess: loginSuccess, data: loginData }
  ] = useLoginMutation();
  const [
    register,
    { isLoading: regLoading, isSuccess: regSuccess, data: regData, error: regError }
  ] = useRegisterMutation();
  // const navigateTo = useNavigate();
  const { from = "reg" } = useParams();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (loginError && "status" in loginError) {
      switch (loginError.status) {
        case 401:
          toast.error("Invalided Token");
          break;
        default:
          break;
      }
    }
  }, [loginError]);

  useEffect(() => {
    if (regError && "status" in regError) {
      switch (regError.status) {
        case 409:
          toast.error("Something Conflicted!");
          break;
        default:
          break;
      }
    }
  }, [regError]);

  useEffect(() => {
    const isSuccess = loginSuccess || regSuccess;
    const data = loginData || regData;
    if (isSuccess && data) {
      // 更新本地认证信息
      toast.success(ct("tip.login"));
      dispatch(setAuthData(data));
      // tricky
      location.href = `/#/`;
    }
  }, [loginSuccess, regSuccess, loginData, regData]);

  const handleAuth = (evt: FormEvent<HTMLFormElement>) => {
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

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };

  if (!token) return <span className="dark:text-white">No Token</span>;
  const isLoading = loginLoading || regLoading;
  const isSuccess = loginSuccess || regSuccess;
  return (
    <>
      <div className="flex-center flex-col pb-6 max-w-md">
        <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-100 mb-2">
          {t("reg.input_name")}
        </h2>
        <span className="text-gray-400 text-center dark:text-gray-100">
          {t("reg.input_name_tip")}
        </span>
      </div>
      <form className="flex flex-col m-auto gap-5 w-80 md:min-w-[360px]" onSubmit={handleAuth}>
        <Input
          className="large"
          name="username"
          value={username}
          required
          placeholder="Type a name"
          onChange={handleInput}
        />
        <Button type="submit" disabled={isLoading || !username || isSuccess}>
          {isLoading ? "Logging in" : `Continue`}
        </Button>
      </form>
    </>
  );
};

export default RegWithUsername;
