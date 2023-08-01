import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useLoginMutation } from "@/app/services/auth";
import { setAuthData } from "@/app/slices/auth.data";
import clsx from "clsx";

export default function OAuthPage() {
  const { t: ct } = useTranslation();
  const [login, { data, isSuccess, isError, isLoading }] = useLoginMutation();
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  useEffect(() => {
    const startOauth = () => {
      if (!token) {
        setError("Token Not Found");
        return;
      }
      login({ key: token, type: "thirdparty" });
    };
    startOauth();
  }, [token]);
  useEffect(() => {
    if (isError) {
      setError("Try Logging in Error");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) {
      // 更新本地认证信息
      toast.success(ct("tip.login"));
      dispatch(setAuthData(data));
      const navPath = searchParams.get("path") || "/";
      navigateTo(navPath);
    }
  }, [isSuccess, data]);

  return (
    <div className="flex-center h-screen dark:bg-gray-900">
      <span className={clsx("text-gray-900 dark:text-gray-100 text-lg", error && "!text-red-500")}>
        {isLoading ? "loading" : ""}
        {error}
      </span>
    </div>
  );
}
