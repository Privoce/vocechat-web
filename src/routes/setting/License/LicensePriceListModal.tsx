import { ChangeEvent, FC, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import * as linkify from "linkifyjs";

import { getLicensePriceList } from "@/app/config";
import { useGetLicensePaymentUrlMutation } from "@/app/services/server";
import { PriceSubscriptionDuration, PriceType } from "@/types/common";
import Modal from "@/components/Modal";
import Button from "@/components/styled/Button";
import Input from "@/components/styled/Input";
import StyledModal from "@/components/styled/Modal";
import StyledRadio from "@/components/styled/Radio";

// import { LicenseMetadata, RenewLicense } from "@/types/server";

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
      res = currDate.add(100, "year");
      break;
    case "month":
      res = currDate.add(1, "month");
      break;
    case "quarter":
      res = currDate.add(3, "month");
      break;
    default:
      break;
  }
  return res.format("YYYY-MM-DD");
};
const LicensePriceList = getLicensePriceList();
const LicensePriceListModal: FC<Props> = ({ closeModal }) => {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const [getUrl, { isLoading, isSuccess }] = useGetLicensePaymentUrlMutation();
  const [host, setHost] = useState(location.hostname);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectPrice, setSelectPrice] = useState(
    `${LicensePriceList[0].pid}|${LicensePriceList[0].limit}|${LicensePriceList[0].type}|${
      LicensePriceList[0].sub_dur || ""
    }`
  );
  const handleRenew = async () => {
    const hostPrefixed = `https://${host}`;
    if (!linkify.test(hostPrefixed)) {
      toast.error("Invalid Host");
      return;
    }
    if (new URL(hostPrefixed).port !== "" || host.endsWith(":443")) {
      toast.error(t("license.tip_port"));
      return;
    }
    const [priceId, user_limit, type, sub_dur = "month"] = selectPrice.split("|") as [
      string,
      string,
      PriceType,
      PriceSubscriptionDuration
    ];
    const metadata = {
      user_limit: Number(user_limit),
      expire: type == "subscription" ? getExpireDay(sub_dur) : getExpireDay("year"),
      // 本地，则*通配符
      domain: host.startsWith("localhost") ? "*" : host,
    };
    console.log(metadata);
    // return;

    const resp = await getUrl({
      type,
      priceId,
      metadata,
      cancel_url: location.href,
      success_url: `${location.origin}/#/cb/payment_success`,
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
    console.log(price);
    setSelectPrice(price);
  };
  const handleUpdateHost = (evt: ChangeEvent<HTMLInputElement>) => {
    setHost(evt.target.value);
  };
  const togglePopUpVisible = () => {
    setPopUpVisible((prev) => !prev);
  };
  const handleTalk = () => {
    window.open("https://buy.stripe.com/bJeaEX9ex2PUer2aLe6c00O", "_blank");
  };
  const isBooking = selectPrice.includes("booking");

  return (
    <Modal id="modal-modal">
      <StyledModal
        footer={
          <div className="text-sm text-gray-400 dark:text-gray-100 mt-3">
            {t("vocespace.prerequisite.4")}
          </div>
        }
        // className="!min-w-[480px]"
        title={t("license.renew")}
        description={t("license.renew_select")}
        buttons={
          <>
            <Button onClick={closeModal} className="ghost">
              {ct("action.cancel")}
            </Button>
            {isBooking ? (
              <Button
                className="text-sm text-white bg-primary-400 break-keep shadow rounded-lg px-3.5 py-2.5 md:hover:bg-primary-500 active:bg-primary-500 disabled:bg-gray-300"
                onClick={handleTalk}
              >
                {t("license.renew")}
              </Button>
            ) : (
              <Tippy
                visible={popUpVisible}
                interactive
                placement="top-end"
                offset={[-50, -40]}
                trigger="click"
                content={
                  <div className="p-3 rounded-lg border border-solid border-gray-200 dark:border-gray-900 flex flex-col items-start gap-3 w-[430px] bg-white dark:bg-gray-800 shadow shadow-gray-200 dark:shadow-gray-900 drop-shadow-xl">
                    <div className="text-gray-500 text-sm">{t("license.tip_domain")}</div>
                    <Input value={host} onChange={handleUpdateHost} />
                    <div className="flex justify-between items-center w-full mt-4">
                      <span className="text-xs text-orange-500 text-left">
                        {" "}
                        {t("license.tip_port")}
                      </span>
                      <div className="flex gap-3 whitespace-nowrap">
                        <Button className="mini cancel" onClick={togglePopUpVisible}>
                          {ct("action.cancel")}
                        </Button>
                        <Button
                          className="mini"
                          disabled={isLoading || isSuccess}
                          onClick={handleRenew}
                        >
                          {isLoading
                            ? "Initialize Payment URL"
                            : isSuccess
                            ? "Redirecting"
                            : t("license.tip_confirm")}
                        </Button>
                      </div>
                    </div>
                  </div>
                }
              >
                <button
                  onClick={togglePopUpVisible}
                  className="text-sm text-white bg-primary-400 break-keep shadow rounded-lg px-3.5 py-2.5 md:hover:bg-primary-500 active:bg-primary-500 disabled:bg-gray-300"
                >
                  {" "}
                  {t("license.renew")}
                </button>
              </Tippy>
            )}
          </>
        }
      >
        <StyledRadio
          options={LicensePriceList.map(
            ({ title, desc, price }) =>
              `${title} ${desc ? `[${desc}]` : ""}${price ? `[${price}]` : ""}`
          )}
          values={LicensePriceList.map(
            ({ pid, limit, type = "payment", sub_dur = "month" }) =>
              `${pid}|${limit}|${type}|${sub_dur}`
          )}
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
