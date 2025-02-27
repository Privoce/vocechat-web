import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import usePinMessage from "@/hooks/usePinMessage";
import Modal from "../Modal";
import Button from "../styled/Button";
import StyledModal from "../styled/Modal";
import PreviewMessage from "./PreviewMessage";

interface Props {
  closeModal: () => void;
  mid: number;
  gid: number;
}

const PinMessageModal: FC<Props> = ({ closeModal, mid = 0, gid = 0 }) => {
  const { t } = useTranslation();
  const { channel, pinMessage, isPining, isSuccess } = usePinMessage(gid);
  const handlePin = () => {
    pinMessage(mid);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      toast.success(t("tip.pin"));
    }
  }, [isSuccess]);

  if (!mid) return null;
  return (
    <Modal>
      <StyledModal
        className="min-w-[320px] md:min-w-[406px]"
        buttons={
          <>
            <Button onClick={closeModal} className="cancel">
              {t("action.cancel")}
            </Button>
            <Button disabled={isPining} onClick={handlePin} className="main">
              {isPining ? "Pining" : t("action.pin")}
            </Button>
          </>
        }
        title={t("action.pin")}
        description={`Do you want to pin this message to #${channel?.name}`}
      >
        <PreviewMessage mid={mid} context="pin" />
      </StyledModal>
    </Modal>
  );
};

export default PinMessageModal;
