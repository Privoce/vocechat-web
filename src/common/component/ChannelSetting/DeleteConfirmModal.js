// import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleChannelSetting } from "../../../app/slices/ui";
import { deleteChannel } from "../../../app/slices/channels";
import Modal from "../Modal";
// import BASE_URL from "../../app/config";
import { useLazyRemoveChannelQuery } from "../../../app/services/channel";
import StyledModal from "../styled/Modal";
import Button from "../styled/Button";

export default function DeleteConfirmModal({ id, closeModal }) {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const pathMatched = useMatch(`/chat/channel/${id}`);
  const [removeChannel, { isLoading, isSuccess }] = useLazyRemoveChannelQuery();
  const handleDelete = () => {
    removeChannel(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("delete channel successfully!");
      dispatch(deleteChannel(id));
      dispatch(toggleChannelSetting());
      if (pathMatched) {
        navigateTo("/chat");
      }
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
        className="animate__animated animate__fadeInDown animate__faster"
      ></StyledModal>
    </Modal>
  );
}
