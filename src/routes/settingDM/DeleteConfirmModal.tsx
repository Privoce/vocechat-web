import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useLazyDeleteUserQuery } from "@/app/services/user";
import Modal from "@/components/Modal";
import Button from "@/components/styled/Button";
import StyledModal from "@/components/styled/Modal";

interface Props {
  id: number;
  closeModal: (cid?: number) => void;
}

const DeleteConfirmModal: FC<Props> = ({ id, closeModal }) => {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const navigateTo = useNavigate();
  const [deleteUser, { isLoading, isSuccess }] = useLazyDeleteUserQuery();
  const handleDelete = () => {
    deleteUser(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(ct("tip.delete"));
      closeModal();
      navigateTo("/chat");
    }
  }, [isSuccess]);

  if (!id) return null;
  return (
    <Modal id="modal-modal">
      <StyledModal
        compact
        title={t("dm.delete")}
        description={t("dm.delete_desc")}
        buttons={
          <>
            <Button onClick={closeModal.bind(null, undefined)} className="cancel">
              {ct("action.cancel")}
            </Button>
            <Button onClick={handleDelete} className="danger">
              {isLoading ? "Deleting" : ct("action.remove")}
            </Button>
          </>
        }
      ></StyledModal>
    </Modal>
  );
};

export default DeleteConfirmModal;
