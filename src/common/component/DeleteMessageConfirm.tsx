import { FC, useState } from "react";
import useDeleteMessage from "../hook/useDeleteMessage";
import StyledModal from "./styled/Modal";
import Button from "./styled/Button";
import Modal from "./Modal";
import PreviewMessage from "./Message/PreviewMessage";

interface Props {
  closeModal: (b: boolean) => void;
  mids?: number[] | number;
}

const DeleteMessageConfirmModal: FC<Props> = ({ closeModal, mids = [] }) => {
  const mid_arr: number[] = mids ? (Array.isArray(mids) ? mids : [mids]) : [];
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
        buttons={
          <>
            <Button className="cancel" onClick={closeModal.bind(null, false)}>
              Cancel
            </Button>
            <Button disabled={isDeleting} onClick={handleDelete} className="danger">
              {isDeleting ? "Deleting" : `Delete`}
            </Button>
          </>
        }
        title="Delete Message"
        description={`Are you sure want to delete ${
          ids.length > 1 ? "these messages" : "this message"
        }?`}
      >
        {ids.length === 1 && <PreviewMessage mid={ids[0]} />}
      </StyledModal>
    </Modal>
  );
};

export default DeleteMessageConfirmModal;
