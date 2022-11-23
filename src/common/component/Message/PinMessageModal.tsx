import { FC } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import usePinMessage from "../../hook/usePinMessage";
import StyledModal from "../styled/Modal";
import Button from "../styled/Button";
import Modal from "../Modal";
import PreviewMessage from "./PreviewMessage";
import { useTranslation } from "react-i18next";

const StyledPinModal = styled(StyledModal)`
  min-width: 406px;
  .title,
  .desc {
    text-align: left;
  }
  .preview {
    border: 1px solid #f2f4f7;
    max-height: 256px;
    overflow: auto;
    background: none;
    overflow-x: hidden;
  }
`;

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
      toast.success("Pin Message Successfully");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (!mid) return null;
  return (
    <Modal>
      <StyledPinModal
        // className="animate__animated animate__fadeInDown animate__faster"
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
        title={t("action.pin") || ""}
        description={`Do you want to pin this message to #${channel?.name}`}
      >
        <PreviewMessage mid={mid} />
      </StyledPinModal>
    </Modal>
  );
};

export default PinMessageModal;
