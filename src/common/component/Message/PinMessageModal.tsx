import { FC } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import usePinMessage from "../../hook/usePinMessage";
import StyledModal from "../styled/Modal";
import Button from "../styled/Button";
import Modal from "../Modal";
import PreviewMessage from "./PreviewMessage";
import { useTranslation } from "react-i18next";


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
