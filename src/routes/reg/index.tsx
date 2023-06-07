import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useSearchParams } from "react-router-dom";

import { useCheckMagicTokenValidMutation } from "@/app/services/auth";
import ExpiredTip from "./ExpiredTip";

type ContextType = { token: string };
export default function RegContainer() {
  const [checkToken, { data: tokenIsValid, isLoading: checkingToken }] =
    useCheckMagicTokenValidMutation();
  const [token, setToken] = useState("");
  let [searchParams] = useSearchParams(new URLSearchParams(location.search));
  const magic_token = searchParams.get("magic_token") ?? "";
  useEffect(() => {
    if (magic_token) {
      checkToken(magic_token);
    }
  }, [magic_token]);
  useEffect(() => {
    if (tokenIsValid) {
      setToken(magic_token);
    }
  }, [tokenIsValid, magic_token]);
  if (checkingToken) return <div className="dark:text-gray-100">Checking Magic Link...</div>;
  return (
    <div className="flex-center h-screen overflow-x-hidden overflow-y-auto dark:bg-gray-700">
      <div className="py-8 px-10 shadow-md rounded-xl max-h-[95vh] overflow-y-auto overflow-x-hidden">
        {tokenIsValid ? <Outlet context={{ token }} /> : <ExpiredTip />}
      </div>
    </div>
  );
}

export function useMagicToken() {
  return useOutletContext<ContextType>();
}
