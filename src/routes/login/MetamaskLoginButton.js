/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useLazyGetMetamaskNonceQuery } from "../../app/services/auth";
import metamaskSvg from "../../assets/icons/metamask.svg?url";
import { StyledSocialButton } from "./styled";

export default function MetamaskLoginButton({ login }) {
  const [requesting, setRequesting] = useState(false);
  const [getNonce] = useLazyGetMetamaskNonceQuery();
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);
  const getSignature = async (address, nonce) => {
    console.log("get sn");
    const signature = await ethereum.request({
      method: "personal_sign",
      params: [nonce, address, "hello from rustchat"],
    });
    return signature;
  };
  const handleMetamaskLogin = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setRequesting(true);
      const [address] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const { data: nonce, isSuccess } = await getNonce(address);
      if (isSuccess) {
        const signature = await getSignature(address, nonce);
        login({
          public_address: address,
          nonce,
          signature,
          type: "metamask",
        });
        setRequesting(false);
      }
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <StyledSocialButton
      disabled={requesting}
      onClick={handleMetamaskLogin}
      href="#"
    >
      <img className="icon" src={metamaskSvg} alt="meta mask icon" />
      Sign in with MetaMask
    </StyledSocialButton>
  );
}
