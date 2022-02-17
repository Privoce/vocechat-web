import { useState, useEffect, useRef } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Sign in with MetaMask';
const CONNECTED_TEXT = 'Connected';
export default function MetamaskLoginButton() {
 const [btnTxt, setBtnTxt] = useState(ONBOARD_TEXT);
 const [isDisabled, setIsDisabled] = useState(false);
 const [accounts, setAccounts] = useState([]);
 const onboarding = useRef();
 useEffect(() => {
  if (!onboarding.current) {
   onboarding.current = new MetaMaskOnboarding();
  }
 }, []);
 useEffect(() => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
   console.log(accounts);
   if (accounts.length > 0) {
    setBtnTxt(CONNECTED_TEXT);
    setIsDisabled(true);
    onboarding.current.stopOnboarding();
   } else {
    setBtnTxt(CONNECT_TEXT);
    setIsDisabled(false);
   }
  }
 }, [accounts]);

 useEffect(() => {
  function handleNewAccounts(newAccounts) {
   setAccounts(newAccounts);
  }
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
   window.ethereum.request({ method: 'eth_requestAccounts' }).then(handleNewAccounts);
   window.ethereum.on('accountsChanged', handleNewAccounts);
   return () => {
    window.ethereum.off('accountsChanged', handleNewAccounts);
   };
  }
 }, []);

 const handleMetamaskLogin = () => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
   window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((newAccounts) => setAccounts(newAccounts));
  } else {
   onboarding.current.startOnboarding();
  }
 };
 return (
  <button disabled={isDisabled} onClick={handleMetamaskLogin} href="#" className="btn social">
   <img
    className="icon"
    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
    alt="meta mask icon"
   />
   {btnTxt}
  </button>
 );
}
