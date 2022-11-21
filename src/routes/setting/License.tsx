import { useState, HTMLAttributes } from "react";
import dayjs from "dayjs";
import Button from "../../common/component/styled/Button";
import useLicense from "../../common/hook/useLicense";
import LicensePriceListModal from "./LicensePriceListModal";
import clsx from "clsx";

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
  const { license: licenseInfo, reachLimit } = useLicense();
  const [modalVisible, setModalVisible] = useState(false);
  const [base58Fold, setBase58Fold] = useState(true);
  const handleRenewLicense = () => {
    toggleModalVisible();
  };
  const toggleModalVisible = () => {
    setModalVisible((prev) => !prev);
  };
  const handleLicenseValueToggle = () => {
    setBase58Fold(pre => !pre);
  };
  return (
    <>
      <div className="max-w-3xl flex flex-col justify-start items-start gap-4">
        <div className={clsx('relative w-full p-3 rounded border-solid border flex flex-col gap-4 shadow', reachLimit ? "border-red-600 bg-red-200/50" : "border-green-600 bg-green-200/50")}>
          <Item label="Signed" data={licenseInfo?.sign ? "Yes" : "Not Yet"} />
          <Item label="Domains" data={licenseInfo?.domains} />
          <Item label="User Limit" data={licenseInfo?.user_limit == 99999 ? "No Limit" : licenseInfo?.user_limit} />
          <Item label="Expired At" data={dayjs(licenseInfo?.expired_at).format("YYYY-MM-DD h:mm:ss A")} />
          <Item label="Created At" data={dayjs(licenseInfo?.created_at).format("YYYY-MM-DD h:mm:ss A")} />
          <Item label="License Value" data={licenseInfo?.base58} foldable={base58Fold} title={base58Fold ? "Click to see full text" : "Click to fold text"}
            onClick={handleLicenseValueToggle} />
        </div>
        <Button onClick={handleRenewLicense}>Renew License</Button>
        <div className="flex flex-col gap-4 bg-primary-500 text-white rounded drop-shadow-xl p-5">
          <h2 className="text-2xl font-bold">A chance to get a free license upgrade! 🎁</h2>
          <p className="text-base flex flex-col"><span>
            Getting a free license upgrade by joining our <em className="font-bold">User Test Session</em>
          </span>
            <span>
              Book a time here: <a className="underline text-lg text-green-200" href="https://calendly.com/hansu/han-meeting" target="_blank" rel="noopener noreferrer">https://calendly.com/hansu/han-meeting</a>
            </span>
            <span>
              Or, add WeChat for more information: <em className="text-lg text-green-200">yanggc_2013</em>
            </span>
          </p>
        </div>
      </div>
      {modalVisible && (
        <LicensePriceListModal
          closeModal={toggleModalVisible}
        />
      )}
    </>
  );
}
