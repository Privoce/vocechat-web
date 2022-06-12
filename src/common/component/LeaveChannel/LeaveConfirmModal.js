import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLeaveChannel from "../../hook/useLeaveChannel";
import Modal from "../Modal";
import StyledModal from "../styled/Modal";
import Button from "../styled/Button";

export default function LeaveConfirmModal({ id, closeModal, handleNextStep }) {
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
        className="compact"
        title="Leave Channel"
        description={
          isOwner
            ? "You need to transfer your channel ownership to someone else before leaving the channel."
            : "Are you sure want to leave this channel?"
        }
        buttons={
          <>
            <Button onClick={closeModal.bind(null, undefined)} className="cancel">
              Cancel
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
}
