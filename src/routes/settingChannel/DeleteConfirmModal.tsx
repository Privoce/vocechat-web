import { useEffect, FC } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../../common/component/Modal";
import { useLazyRemoveChannelQuery } from "../../app/services/channel";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";
import { useTranslation } from "react-i18next";

interface Props {
  id: number;
  closeModal: (cid?: number) => void;
}

const DeleteConfirmModal: FC<Props> = ({ id, closeModal }) => {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const navigateTo = useNavigate();
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
  }, [isSuccess]);

  if (!id) return null;
  return (
    <Modal id="modal-modal">
      <StyledModal
        className="compact"
        title={t("channel.delete")}
        description={t("channel.delete_desc")}
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
