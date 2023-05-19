import { FC, useEffect } from "react";

import { useGetOpenidMutation } from "@/app/services/auth";
import { OIDCConfig } from "@/types/auth";
import Button from "@/components/styled/Button";

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
    <Button
      className="flex flex-center gap-3"
      disabled={isLoading || isSuccess}
      onClick={handleSolidLogin}
    >
      {!!issuer.favicon && <img src={issuer.favicon} className="w-6 h-6" alt="icon" />}
      {isLoading ? `Loading...` : `Login with ${issuer.domain}`}
    </Button>
  );
};
export default OidcLoginEntry;
