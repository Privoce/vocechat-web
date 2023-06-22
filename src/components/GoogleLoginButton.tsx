import { FC, Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { KEY_LOCAL_MAGIC_TOKEN } from "@/app/config";
import { useLoginMutation } from "@/app/services/auth";
import IconGoogle from "@/assets/icons/google.svg";
import Button from "./styled/Button";

interface Props {
  loadError?: boolean;
  loaded?: boolean;
  clientId?: string;
  type?: "login" | "register";
}

const GoogleLoginInner: FC<Props> = ({ type = "login", loaded, loadError }) => {
  const { t } = useTranslation("auth");
  const { t: ct } = useTranslation();
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  //拿本地存的magic token
  const magic_token = localStorage.getItem(KEY_LOCAL_MAGIC_TOKEN);
  useEffect(() => {
    if (isSuccess) {
      toast.success(ct("tip.login"));
      // navigateTo("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error && "status" in error) {
      switch (error.status) {
        case 410:
          toast.error(
            "No associated account found, please contact user admin for an invitation link to join."
          );
          break;
        default:
          toast.error("Something Error");
          break;
      }
    }
  }, [error]);

  return (
    <Button
      className=" group relative w-full !bg-white dark:!bg-gray-700 !text-gray-600 dark:!text-gray-200 overflow-hidden border border-solid border-gray-300 dark:border-gray-500"
      disabled={!loaded || isLoading}
    >
      <div className="absolute left-0 top-0 w-full h-full flex-center gap-3 z-[998] bg-inherit">
        <IconGoogle className="w-6 h-6 absolute left-4" />
        {loadError
          ? "Script Load Error!"
          : loaded
          ? `${type === "login" ? t("login.google") : t("reg.google")}`
          : `Initializing`}
      </div>
      <div className="absolute left-0 top-0 w-full h-full group-hover:opacity-0 group-hover:z-[999]">
        <GoogleLogin
          width="360px"
          onSuccess={(res) => {
            login({
              magic_token,
              id_token: res.credential || "",
              type: "google"
            });
          }}
        />
      </div>
    </Button>
  );
};

const GoogleLoginButton: FC<Props> = ({ type = "login", clientId }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  if (!clientId) return null;
  return (
    <Suspense fallback={<span>loading...</span>}>
      <GoogleOAuthProvider
        onScriptLoadError={() => {
          setHasError(true);
        }}
        onScriptLoadSuccess={() => {
          setScriptLoaded(true);
        }}
        clientId={clientId}
      >
        <GoogleLoginInner type={type} loaded={scriptLoaded} loadError={hasError} />
      </GoogleOAuthProvider>
    </Suspense>
  );
};

export default GoogleLoginButton;
