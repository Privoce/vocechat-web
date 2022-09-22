import { FC, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../common/component/Modal";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";
import StyledRadio from "../../common/component/styled/Radio";

import { useGetLicensePaymentUrlMutation } from "../../app/services/server";
import { LicensePriceList } from "../../app/config";
// import { LicenseMetadata, RenewLicense } from "../../types/server";

interface Props {
  closeModal: () => void;
  // domain: string;
}

const LicensePriceListModal: FC<Props> = ({ closeModal }) => {
  const [getUrl, { isLoading, isSuccess }] = useGetLicensePaymentUrlMutation();
  const [selectPrice, setSelectPrice] = useState(
    `${LicensePriceList[0].pid}|${LicensePriceList[0].limit}`
  );
  const handleRenew = async () => {
    const [priceId, user_limit] = selectPrice.split("|");
    const resp = await getUrl({
      priceId,
      metadata: {
        user_limit: Number(user_limit),
        expire: "2035-01-01",
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
        title="Renew License"
        description="Please select the price"
        buttons={
          <>
            <Button onClick={closeModal} className="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading || isSuccess} onClick={handleRenew} className="danger">
              {isLoading ? "Initialize Payment Url" : isSuccess ? "Redirecting" : "Renew"}
            </Button>
          </>
        }
      >
        <StyledRadio
          options={LicensePriceList.map(({ title, desc }) => `${title} [${desc}]`)}
          values={LicensePriceList.map(({ pid, limit }) => `${pid}|${limit}`)}
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
