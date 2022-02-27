/* eslint-disable no-undef */
import { useEffect } from "react";
import { useGetOpenidMutation } from "../../app/services/auth";
export default function SolidLoginButton({ login }) {
  const [getOpenId, { data, isLoading, isSuccess }] = useGetOpenidMutation();

  const handleSolidLogin = async () => {
    getOpenId({ issuer_url: "https://solidweb.org" });
  };
  useEffect(() => {
    if (isSuccess) {
      console.log("wtf", data);
      const { id, url } = data;
      window.open(url);
      login({
        id,
        type: "oidc",
      });
      // location.href = url;
    }
  }, [data, isSuccess]);

  return (
    <button
      disabled={isLoading}
      onClick={handleSolidLogin}
      href="#"
      className="btn social"
    >
      <img
        className="icon"
        src="https://solidproject.org/assets/img/solid-emblem.svg"
        alt="solid logo icon"
      />
      Sign in with Solid
    </button>
  );
}
