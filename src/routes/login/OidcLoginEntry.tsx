/* eslint-disable no-undef */
import { useEffect } from "react";
import { useGetOpenidMutation } from "../../app/services/auth";
import { StyledSocialButton } from "./styled";

export default function OidcLoginEntry({ issuer }) {
  const [getOpenId, { data, isLoading, isSuccess }] = useGetOpenidMutation();

  const handleSolidLogin = () => {
    getOpenId({
      // issuer: "solidweb.org",
      issuer,
      redirect_uri: `${location.origin}/#/login`
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("wtf", data);
      const { url } = data;
      location.href = url;
    }
  }, [data, isSuccess]);
  console.log(issuer);

  return (
    <StyledSocialButton disabled={isLoading} onClick={handleSolidLogin}>
      {Boolean(issuer.favicon) && <img src={issuer.favicon} className="icon" alt="icon" />}
      Login with {issuer.domain}
    </StyledSocialButton>
  );
}
