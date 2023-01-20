import { ChangeEvent, FC, useState } from "react";
import toast from "react-hot-toast";
import * as linkify from 'linkifyjs';
import Modal from "../../../common/component/Modal";
import StyledModal from "../../../common/component/styled/Modal";
import Button from "../../../common/component/styled/Button";
import StyledRadio from "../../../common/component/styled/Radio";
import Input from "../../../common/component/styled/Input";

import { useGetLicensePaymentUrlMutation } from "../../../app/services/server";
import { getLicensePriceList } from "../../../app/config";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { PriceSubscriptionDuration, PriceType } from "../../../types/common";
import Tippy from "@tippyjs/react";
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
  const [host, setHost] = useState(location.host);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectPrice, setSelectPrice] = useState(
    `${LicensePriceList[0].pid}|${LicensePriceList[0].limit}|${LicensePriceList[0].type}|${LicensePriceList[0].sub_dur || ""}`
  );
  const handleRenew = async () => {
    if (!linkify.test(host)) {
      toast.error("Invalid Host");
      return;
    }
    const [priceId, user_limit, type, sub_dur = "month"] = selectPrice.split("|") as [string, string, PriceType, PriceSubscriptionDuration];
    const metadata = {
      user_limit: Number(user_limit),
      expire: type == "subscription" ? getExpireDay(sub_dur) : getExpireDay("year"),
      // 本地，则*通配符
      domain: host.startsWith("localhost") ? "*" : host
    };
    console.log(metadata);
    // return;

    const resp = await getUrl({
      type,
      priceId,
      metadata,
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
  const handleUpdateHost = (evt: ChangeEvent<HTMLInputElement>) => {
    setHost(evt.target.value);
  };
  const togglePopUpVisible = () => {
    setPopUpVisible(prev => !prev);
  };
  return (
    <Modal id="modal-modal">
      <StyledModal
        className="!min-w-[480px]"
        title={t("license.renew")}
        description={t("license.renew_select")}
        buttons={
          <>
            <Button onClick={closeModal} className="ghost">
              {ct("action.cancel")}
            </Button>
            <Tippy
              visible={popUpVisible}
              interactive
              placement="top-end"
              offset={[0, -40]}
              trigger="click"
              content={
                <div className="p-3 rounded-lg border border-solid border-gray-200 flex flex-col items-start gap-3 w-[340px] bg-white shadow shadow-gray-200 drop-shadow-xl">
                  <div className="text-gray-500 text-sm">
                    {t("license.tip_domain")}
                  </div>
                  <Input value={host} onChange={handleUpdateHost} />
                  <div className="flex justify-between items-center w-full mt-4">
                    <span className="text-xs text-orange-500"> {t("license.tip_port")}</span>
                    <div className="flex gap-3">
                      <Button className="cancel mini" onClick={togglePopUpVisible}>
                        {ct("action.cancel")}
                      </Button>
                      <Button className="mini" disabled={isLoading || isSuccess} onClick={handleRenew}>
                        {isLoading ? "Initialize Payment Url" : isSuccess ? "Redirecting" : t("license.tip_confirm")}
                      </Button>

                    </div>
                  </div>
                </div>
              }
            >
              <Button onClick={togglePopUpVisible}>
                {t("license.renew")}
              </Button>
            </Tippy>
          </>
        }
      >
        <StyledRadio
          options={LicensePriceList.map(({ title, desc, price }) => `${title} [${desc}][${price}]`)}
          values={LicensePriceList.map(({ pid, limit, type = "payment", sub_dur = "month" }) => `${pid}|${limit}|${type}|${sub_dur}`)}
          value={selectPrice}
          onChange={(v) => {
            handlePriceSelect(v);
          }}
        />
      </StyledModal>
    </Modal>
  );
};

export default LicensePriceListModal;
