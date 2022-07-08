import { useEffect, FC } from "react";
import { useGetOpenidMutation } from "../../app/services/auth";
import { OIDCConfig } from "../../types/auth";
import { StyledSocialButton } from "./styled";

const OidcLoginEntry: FC<{ issuer: OIDCConfig }> = ({ issuer }) => {
  const [getOpenId, { data, isLoading, isSuccess }] = useGetOpenidMutation();

  const handleSolidLogin = () => {
    getOpenId({
      issuer: issuer.domain,
      redirect_uri: `${location.origin}/#/login`
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      const { url } = data;
      location.href = url;
    }
  }, [data, isSuccess]);

  return (
    <StyledSocialButton disabled={isLoading} onClick={handleSolidLogin}>
      {Boolean(issuer.favicon) && <img src={issuer.favicon} className="icon" alt="icon" />}
      Login with {issuer.domain}
    </StyledSocialButton>
  );
};
export default OidcLoginEntry;
