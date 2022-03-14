// import React from "react";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import BASE_URL from "../../app/config";
import { useLazyDeleteMessageQuery } from "../../../app/services/message";
import StyledModal from "../styled/Modal";
import Button from "../styled/Button";
import Modal from "../Modal";
import PreviewMessage from "./PreviewMessage";
export default function DeleteMessageConfirmModal({ closeModal, mid = 0 }) {
  // const dispatch = useDispatch();
  const [deleteMessage, { isLoading, isSuccess }] = useLazyDeleteMessageQuery();
  const handleDelete = (evt) => {
    const { mid } = evt.target.dataset;
    if (!mid) return;
    deleteMessage(mid);
  };
  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  if (!mid) return null;
  return (
    <Modal>
      <StyledModal
        className="animate__animated animate__fadeInDown animate__faster"
        buttons={
          <>
            <Button onClick={closeModal}>Cancel</Button>
            <Button data-mid={mid} onClick={handleDelete} className="danger">
              {isLoading ? "Deleting" : `Delete`}
            </Button>
          </>
        }
        title="Delete Message"
        description="Are you sure want to delete this message?"
      >
        <PreviewMessage mid={mid} />
      </StyledModal>
    </Modal>
  );
}
