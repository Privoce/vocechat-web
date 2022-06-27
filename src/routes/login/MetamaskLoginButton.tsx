/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useLazyGetMetamaskNonceQuery } from "../../app/services/auth";
import metamaskSvg from "../../assets/icons/metamask.svg?url";
import { StyledSocialButton } from "./styled";
// import toast from "react-hot-toast";

export default function MetamaskLoginButton({ login }) {
  const [requesting, setRequesting] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [getNonce] = useLazyGetMetamaskNonceQuery();
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      ethereum.on("accountsChanged", handleNewAccounts);
    }
    return () => {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        ethereum.removeListener("accountsChanged", handleNewAccounts);
      }
    };
  }, []);
  useEffect(() => {
    const startLoginWithMask = async (address) => {
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
        onboarding.current.stopOnboarding();
      } else {
        // setButtonText(CONNECT_TEXT);
        setRequesting(false);
      }
    }
  }, [accounts]);
  const getSignature = async (address, nonce) => {
    console.log("get sn");
    const signature = await ethereum.request({
      method: "personal_sign",
      params: [nonce, address, "hello from "]
    });
    return signature;
  };
  const handleMetamaskLogin = async () => {
    console.log("wtfff", MetaMaskOnboarding.isMetaMaskInstalled());
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setRequesting(true);
      try {
        const tmps = await ethereum.request({
          method: "eth_requestAccounts"
        });
        setAccounts(tmps);
      } catch (error) {
        // toast.error(error.message);
        ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }]
        });
        // setRequesting(false);
      }
      setRequesting(false);
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <StyledSocialButton disabled={requesting} onClick={handleMetamaskLogin}>
      <img className="icon" src={metamaskSvg} alt="meta mask icon" />
      Sign in with MetaMask
    </StyledSocialButton>
  );
}
