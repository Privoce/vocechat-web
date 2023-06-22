/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MetaMaskOnboarding from "@metamask/onboarding";

import { useLazyGetMetamaskNonceQuery } from "@/app/services/auth";
import { LoginCredential } from "@/types/auth";
import { AuthType } from "@/types/common";
import Button from "@/components/styled/Button";
import metamaskSvg from "@/assets/icons/metamask.svg?url";

// import toast from "react-hot-toast";

export default function MetamaskLoginButton({
  login,
  type = "login"
}: {
  login: (params: LoginCredential) => void;
  type?: AuthType;
}) {
  const { t } = useTranslation("auth");
  const [requesting, setRequesting] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [getNonce] = useLazyGetMetamaskNonceQuery();
  const onboarding = useRef<MetaMaskOnboarding | undefined>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
    function handleNewAccounts(newAccounts: any) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on("accountsChanged", handleNewAccounts);
    }
    return () => {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      }
    };
  }, []);
  useEffect(() => {
    const startLoginWithMask = async (address: string) => {
      const { data: nonce, isSuccess } = await getNonce(address);
      if (isSuccess) {
        const signature = await getSignature(address, nonce);
        login({
          public_address: address,
          nonce,
          signature,
          type: "metamask"
        });
      }
    };
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        // setButtonText(CONNECTED_TEXT);
        const [address] = accounts;
        startLoginWithMask(address);
        setRequesting(true);
        onboarding.current?.stopOnboarding();
      } else {
        // setButtonText(CONNECT_TEXT);
        setRequesting(false);
      }
    }
  }, [accounts]);
  const getSignature = async (address: string, nonce: string) => {
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [nonce, address, "hello from "]
    });
    return signature;
  };
  const handleMetamaskLogin = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setRequesting(true);
      try {
        const tmps = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setAccounts(tmps);
      } catch (error) {
        // toast.error(error.message);
        window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }]
        });
        // setRequesting(false);
      }
      setRequesting(false);
    } else {
      onboarding.current?.startOnboarding();
    }
  };
  return (
    <Button
      className="flex ghost flex-center gap-2 relative"
      disabled={requesting}
      onClick={handleMetamaskLogin}
    >
      <img className="w-6 h-6 absolute left-4" src={metamaskSvg} alt="meta mask icon" />
      {type == "login" ? t("login.metamask") : t("reg.metamask")}
    </Button>
  );
}
