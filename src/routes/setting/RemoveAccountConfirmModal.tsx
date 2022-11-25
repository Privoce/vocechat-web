import { FC } from "react";
import toast from "react-hot-toast";
import Modal from "../../common/component/Modal";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";
import { useLazyDeleteCurrentAccountQuery } from "../../app/services/auth";
import { useTranslation } from "react-i18next";

interface Props {
  closeModal: () => void;
}

const RemoveConfirmModal: FC<Props> = ({ closeModal }) => {
  const { t } = useTranslation("member");
  const [removeCurrentAccount, { isLoading }] = useLazyDeleteCurrentAccountQuery();
  const handleRemove = async () => {
    try {
      await removeCurrentAccount();
      // toast.success("Remove Account Successfully!");
    } catch (error) {
      toast.error("Remove Account Failed!");
    }
  };
  return (
    <Modal id="modal-modal">
      <StyledModal
        title={t("remove_account")}
        description={t("remove_account_desc")}
        buttons={
          <>
            <Button onClick={closeModal}>{t("action.cancel", { ns: "common" })}</Button>
            <Button disabled={isLoading} onClick={handleRemove} className="danger">
              {t("remove")}
            </Button>
          </>
        }
      ></StyledModal>
    </Modal>
  );
};

export default RemoveConfirmModal;
