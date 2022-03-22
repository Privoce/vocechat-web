// import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useMatch } from "react-router-dom";
import Modal from "../Modal";
// import BASE_URL from "../../app/config";
import { useLazyRemoveChannelQuery } from "../../../app/services/channel";
import StyledModal from "../styled/Modal";
import Button from "../styled/Button";

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
      if (pathMatched) {
        navigateTo("/chat");
      }
      closeModal();
    }
  }, [isSuccess, id, pathMatched]);
  if (!id) return null;
  return (
    <Modal id="modal-modal">
      <StyledModal
        title="Delete Channel"
        description="Are you sure want to delete this channel?"
        buttons={
          <>
            {" "}
            <Button onClick={closeModal}>Cancel</Button>
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
