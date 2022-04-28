// import React from "react";
import { useState } from "react";
import useDeleteMessage from "../hook/useDeleteMessage";
import StyledModal from "./styled/Modal";
import Button from "./styled/Button";
import Modal from "./Modal";
import PreviewMessage from "./Message/PreviewMessage";
export default function DeleteMessageConfirmModal({ closeModal, mids = [] }) {
  // const dispatch = useDispatch();
  const mid_arr = mids ? (Array.isArray(mids) ? mids : [mids]) : [];
  const [ids] = useState(mid_arr);
  const { deleteMessage, isDeleting } = useDeleteMessage();
  const handleDelete = async () => {
    await deleteMessage(ids);
    closeModal(true);
  };

  if (ids.length == 0) return null;
  return (
    <Modal>
      <StyledModal
        // className="animate__animated animate__fadeInDown animate__faster"
        buttons={
          <>
            <Button onClick={closeModal.bind(null, false)}>Cancel</Button>
            <Button
              disabled={isDeleting}
              onClick={handleDelete}
              className="danger"
            >
              {isDeleting ? "Deleting" : `Delete`}
            </Button>
          </>
        }
        title="Delete Message"
        description={`Are you sure want to delete ${
          ids.length > 1 ? "these messages" : "this message"
        }?`}
      >
        {ids.length == 1 && <PreviewMessage mid={ids[0]} />}
      </StyledModal>
    </Modal>
  );
}
