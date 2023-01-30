import { useEffect } from "react";
import { useLazyGetGeneratedLicenseQuery } from "../../app/services/server";
import useLicense from "../../common/hook/useLicense";
import Button from "../../common/component/styled/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  sid: string;
};

const PaymentSuccess = ({ sid }: Props) => {
  const { t } = useTranslation("setting", { keyPrefix: "license" });
  const navigateTo = useNavigate();
  const { upsertLicense, upserting, upserted } = useLicense();
  const [getGeneratedLicense, { data, isError, isLoading, isSuccess }] =
    useLazyGetGeneratedLicenseQuery();
  useEffect(() => {
    if (sid) {
      getGeneratedLicense(sid);
    }
  }, [sid]);
  useEffect(() => {
    if (isSuccess && data) {
      const l = data.license;
      upsertLicense(l);
    }
  }, [data, isSuccess]);
  const handleBack = () => {
    navigateTo("/");
  };
  return (
    <section className="flex flex-col items-center bg-slate-100 rounded-2xl w-[512px] p-6">
      <img className="w-28 h-28" src="https://s.voce.chat/web_client/assets/img/check.png" alt="check icon" />
      <h1 className="font-bold text-3xl pt-5">{t("payment_success")}</h1>
      <p className="text-lg pb-7 mt-2 text-gray-400">
        {upserting ? t("tip_renewing") : ""}
        {upserted ? t("tip_renewed") : ""}
        {isError ? t("tip_renew_error") : ""}
      </p>
      <Button disabled={isLoading || upserting} className="back" onClick={handleBack}>
        {t("back_home")}
      </Button>
    </section>
  );
};

export default PaymentSuccess;
