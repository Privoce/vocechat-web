import { useEffect, FC } from "react";
import { useGetOpenidMutation } from "../../app/services/auth";
import Button from "../../common/component/styled/Button";
import { OIDCConfig } from "../../types/auth";

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
    <Button className="flex text-gray-800 dark:text-gray-100 flex-center gap-3" disabled={isLoading || isSuccess} onClick={handleSolidLogin}>
      {!!issuer.favicon && <img src={issuer.favicon} className="w-6 h-6" alt="icon" />}
      {isLoading ? `Loading...` : `Login with ${issuer.domain}`}
    </Button>
  );
};
export default OidcLoginEntry;
