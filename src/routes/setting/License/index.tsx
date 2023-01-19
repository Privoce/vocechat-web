import { useState, HTMLAttributes } from "react";
import dayjs from "dayjs";
import Button from "../../../common/component/styled/Button";
import useLicense from "../../../common/hook/useLicense";
import LicensePriceListModal from "./LicensePriceListModal";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import UpdateLicenseModal from "./UpdateLicenseModal";
import Tippy from "@tippyjs/react";

interface ItemProps extends HTMLAttributes<HTMLSpanElement> { label: string, data?: string | number | string[], foldable?: boolean }
const Item = ({ label, data, foldable = false, ...rest }: ItemProps) => {
  const infoClass = clsx("font-bold w-full cursor-pointer", foldable ? " overflow-hidden text-ellipsis" : "whitespace-pre-wrap break-all");
  if (!data) return null;
  return <div className="whitespace-nowrap  flex flex-col items-start justify-start text-lg">
    <span className="text-sm text-gray-400">{label}</span>
    {Array.isArray(data) ? <ul className={infoClass}>
      {data.map((d) => {
        return <li key={d}>{d}</li>;
      })}
    </ul> : <span className={infoClass} {...rest}>
      {data}
    </span>}
  </div>;

};
export default function License() {
  const { t, i18n } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const { license: licenseInfo, reachLimit, upsertLicense, upserting, upserted } = useLicense();
  const [modalVisible, setModalVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [base58Fold, setBase58Fold] = useState(true);
  const toggleModalVisible = () => {
    setModalVisible((prev) => !prev);
  };
  const toggleUpdateModalVisible = () => {
    setUpdateVisible((prev) => !prev);
  };
  const handleLicenseValueToggle = () => {
    setBase58Fold(pre => !pre);
  };

  return (
    <>
      <div className="max-w-3xl flex flex-col justify-start items-start gap-4">
        <div className={clsx('relative w-full p-3 rounded border-solid border flex flex-col gap-4 shadow', reachLimit ? "border-red-600 bg-red-200/50" : "border-green-600 bg-green-200/50")}>
          <Item label={t("license.signed")} data={licenseInfo?.sign ? "Yes" : "Not Yet"} />
          <Item label={t("license.domain")} data={licenseInfo?.domains} />
          <Item label={t("license.user_limit")} data={licenseInfo?.user_limit == 99999 ? "No Limit" : licenseInfo?.user_limit} />
          <Item label={t("license.expire")} data={dayjs(licenseInfo?.expired_at).format("YYYY-MM-DD h:mm:ss A")} />
          <Item label={t("license.create")} data={dayjs(licenseInfo?.created_at).format("YYYY-MM-DD h:mm:ss A")} />
          <Item label={t("license.value")} data={licenseInfo?.base58} foldable={base58Fold} title={base58Fold ? "Click to see full text" : "Click to fold text"}
            onClick={handleLicenseValueToggle} />
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleModalVisible}>{t("license.renew")}</Button>
          <Button onClick={toggleUpdateModalVisible} className="ghost">{t("license.update")}</Button>
        </div>
        <div className="flex flex-col gap-4 bg-primary-500 text-white rounded drop-shadow-xl p-5">
          <h2 className="text-2xl font-bold">{t("license.tip.title")} 🎁</h2>
          <p className="text-base flex flex-col">
            <span>
              {t("license.tip.user_test")}
            </span>
            <span>
              {t("license.tip.contact")}
              {i18n.language.startsWith("zh") ? "Privoce" : <a className="underline text-lg text-green-200" href="https://calendly.com/hansu/han-meeting" target="_blank" rel="noopener noreferrer">https://calendly.com/hansu/han-meeting</a>}
            </span>
          </p>
        </div>
      </div>
      {modalVisible && (
        <LicensePriceListModal
          closeModal={toggleModalVisible}
        />
      )}
      {updateVisible && (
        <UpdateLicenseModal
          updated={upserted}
          updating={upserting}
          updateLicense={upsertLicense}
          closeModal={toggleUpdateModalVisible}
        />
      )}
    </>
  );
}
