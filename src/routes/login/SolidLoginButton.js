/* eslint-disable no-undef */
import { useEffect } from "react";
import { useGetOpenidMutation } from "../../app/services/auth";
import solidSvg from "../../assets/icons/solid.svg?url";
export default function SolidLoginButton() {
  const [getOpenId, { data, isLoading, isSuccess }] = useGetOpenidMutation();

  const handleSolidLogin = () => {
    getOpenId({
      // issuer: "solidweb.org",
      issuer: "broker.pod.inrupt.com",
      redirect_uri: `${location.origin}/#/login`,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      console.log("wtf", data);
      const { url } = data;
      location.href = url;
    }
  }, [data, isSuccess]);

  return (
    <button
      disabled={isLoading}
      onClick={handleSolidLogin}
      href="#"
      className="btn social"
    >
      <img src={solidSvg} className="icon" alt="solid icon" />
      {isLoading ? `Redirecting...` : `Sign in with Solid`}
    </button>
  );
}
