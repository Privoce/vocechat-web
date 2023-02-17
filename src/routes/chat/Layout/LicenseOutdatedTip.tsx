// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../../common/component/styled/Button";
// type Props = {};

const LicenseUpgradeTip = () => {
  const { t } = useTranslation("chat");
  const navigateTo = useNavigate();
  const handleRedirect = () => {
    navigateTo("/setting/license");
  };

  return (
    <div className="flex items-center justify-between bg-red-600 rounded-md w-full py-3 px-4">
      <span className="text-white">
        <i className="text-xl mr-2">🚨</i>
        {t("license_tip")}
      </span>
      <Button onClick={handleRedirect} className="small">{`Upgrade License`}</Button>
    </div>
  );
};

export default LicenseUpgradeTip;
