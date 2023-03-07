import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("chat");
  const { t: ct } = useTranslation();
  const mid_arr: number[] = mids ? (Array.isArray(mids) ? mids : [mids]) : [];
  const [ids] = useState(mid_arr);
  const { deleteMessage, isDeleting } = useDeleteMessage();
  const handleDelete = async () => {
    await deleteMessage(ids);
    closeModal(true);
  };

  if (ids.length == 0) return null;
  const msgTip = ids.length > 1 ? t("delete_msg_these") : t("delete_msg_this");
  return (
    <Modal>
      <StyledModal
        buttons={
          <>
            <Button className="cancel" onClick={closeModal.bind(null, false)}>
              {ct("action.cancel")}
            </Button>
            <Button disabled={isDeleting} onClick={handleDelete} className="danger">
              {isDeleting ? "Deleting" : ct("action.remove")}
            </Button>
          </>
        }
        title={t("delete_msg_title")}
        description={t("delete_msg_desc", { msg: msgTip })}
      >
        {ids.length === 1 && <PreviewMessage mid={ids[0]} />}
      </StyledModal>
    </Modal>
  );
};

export default DeleteMessageConfirmModal;
