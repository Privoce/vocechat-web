// import { useState, useEffect } from "react";
import { useGoogleLogin } from 'react-google-login';
import { googleClientID } from '../../app/config';
export default function GoogleLoginButton({ login }) {
 const { signIn, loaded } = useGoogleLogin({
  clientId: googleClientID,
  onSuccess: ({ tokenId, ...rest }) => {
   console.log('success', tokenId, rest);
   login({
    id_token: tokenId,
    type: 'google'
   });
  },
  onFailure: (wtf) => {
   console.log('failure', wtf);
  }
 });
 const handleGoogleLogin = () => {
  signIn();
 };
 return (
  <button disabled={!loaded} onClick={handleGoogleLogin} href="#" className="btn social">
   <img
    className="icon"
    src="https://static.nicegoodthings.com/project/rustchat/google.icon.png"
    alt="google icon"
   />
   Sign in with Google
  </button>
 );
}
