// import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useMatch } from "react-router-dom";
import Modal from "../../common/component/Modal";
import { useLazyRemoveChannelQuery } from "../../app/services/channel";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";

export default function DeleteConfirmModal({ id, closeModal }) {
  const navigateTo = useNavigate();
  const pathMatched = useMatch(`/chat/channel/${id}`);
  const [deleteChannel, { isLoading, isSuccess }] = useLazyRemoveChannelQuery();
  const handleDelete = () => {
    deleteChannel(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("delete channel successfully!");
      closeModal();
      navigateTo("/chat");
    }
  }, [isSuccess, id, pathMatched]);
  if (!id) return null;
  return (
    <Modal id="modal-modal">
      <StyledModal
        className="compact"
        title="Delete Channel"
        description="Are you sure want to delete this channel?"
        buttons={
          <>
            <Button
              onClick={closeModal.bind(null, undefined)}
              className="cancel"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} className="danger">
              {isLoading ? "Deleting" : `Delete`}
            </Button>
          </>
        }
        // className="animate__animated animate__fadeInDown animate__faster"
      ></StyledModal>
    </Modal>
  );
}
