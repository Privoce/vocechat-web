import { FC, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../common/component/Modal";
import StyledModal from "../../../common/component/styled/Modal";
import Button from "../../../common/component/styled/Button";
import StyledRadio from "../../../common/component/styled/Radio";

import { useGetLicensePaymentUrlMutation } from "../../../app/services/server";
import { getLicensePriceList } from "../../../app/config";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { PriceSubscriptionDuration, PriceType } from "../../../types/common";
// import { LicenseMetadata, RenewLicense } from "../../types/server";

interface Props {
  closeModal: () => void;
  // domain: string;
}

const getExpireDay = (sub_dur: PriceSubscriptionDuration) => {
  const currDate = dayjs();
  // 默认10年
  let res = currDate;
  switch (sub_dur) {
    case "year":
      res = currDate.add(1, "year");
      break;
    case "month":
      res = currDate.add(1, "month");
      break;
    case "quarter":
      res = currDate.add(3, "month");
      break;
    default:
      break;
  };
  return res.format("YYYY-MM-DD");
};
const LicensePriceList = getLicensePriceList();
const LicensePriceListModal: FC<Props> = ({ closeModal }) => {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const [getUrl, { isLoading, isSuccess }] = useGetLicensePaymentUrlMutation();
  const [selectPrice, setSelectPrice] = useState(
    `${LicensePriceList[0].pid}|${LicensePriceList[0].limit}|${LicensePriceList[0].type}|${LicensePriceList[0].sub_dur || ""}`
  );
  const handleRenew = async () => {
    const [priceId, user_limit, type, sub_dur = "month"] = selectPrice.split("|") as [string, string, PriceType, PriceSubscriptionDuration];
    const resp = await getUrl({
      type,
      priceId,
      metadata: {
        user_limit: Number(user_limit),
        expire: type == "subscription" ? getExpireDay(sub_dur) : getExpireDay("year"),
        // 本地，则*通配符
        domain: location.hostname.startsWith("localhost") ? "*" : location.hostname
      },
      cancel_url: location.href,
      success_url: `${location.origin}/#/cb/payment_success`
    });
    if ("error" in resp) {
      toast.error("Payment link initialized failed!");
      return;
    }
    console.log("aaaa", resp.data);
    // todo
    location.href = resp.data.session_url;
  };
  const handlePriceSelect = (price: string) => {
    setSelectPrice(price);
  };
  return (
    <Modal id="modal-modal">
      <StyledModal
        title={t("license.renew")}
        description={t("license.renew_select")}
        buttons={
          <>
            <Button onClick={closeModal} className="ghost">
              {ct("action.cancel")}
            </Button>
            <Button disabled={isLoading || isSuccess} onClick={handleRenew} >
              {isLoading ? "Initialize Payment Url" : isSuccess ? "Redirecting" : t("license.renew")}
            </Button>
          </>
        }
      >
        <StyledRadio
          options={LicensePriceList.map(({ title, desc }) => `${title} [${desc}]`)}
          values={LicensePriceList.map(({ pid, limit, type = "payment", sub_dur = "month" }) => `${pid}|${limit}|${type}|${sub_dur}`)}
          value={selectPrice}
          onChange={(v) => {
            console.log("wtff", v);
            handlePriceSelect(v);
          }}
        />
      </StyledModal>
    </Modal>
  );
};

export default LicensePriceListModal;
