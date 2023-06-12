import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useLeaveChannel from "@/hooks/useLeaveChannel";
import Modal from "../Modal";
import Button from "../styled/Button";
import StyledModal from "../styled/Modal";

interface Props {
  id: number;
  closeModal: () => void;
  handleNextStep: () => void;
}

const LeaveConfirmModal: FC<Props> = ({ id, closeModal, handleNextStep }) => {
  const { t } = useTranslation("setting");
  const navigateTo = useNavigate();
  const { isOwner, leaving, leaveChannel, leaveSuccess } = useLeaveChannel(id);

  useEffect(() => {
    if (leaveSuccess) {
      toast.success("Leave channel successfully!");
      closeModal();
      navigateTo("/chat");
    }
  }, [leaveSuccess]);
  if (!id) return null;
  return (
    <Modal id="modal-modal">
      <StyledModal
        compact
        title={t("channel.leave")}
        description={isOwner ? t("channel.transfer_desc") : t("channel.leave_desc")}
        buttons={
          <>
            <Button onClick={closeModal.bind(null, undefined)} className="cancel">
              {t("action.cancel", { ns: "common" })}
            </Button>
            {isOwner ? (
              <Button onClick={handleNextStep} className="main">
                Next
              </Button>
            ) : (
              <Button onClick={leaveChannel} className="danger">
                {leaving ? "Leaving" : `Leave`}
              </Button>
            )}
          </>
        }
      ></StyledModal>
    </Modal>
  );
};

export default LeaveConfirmModal;
