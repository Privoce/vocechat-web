import { FC } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import StyledModal from "@/components/styled/Modal";
import Button from "@/components/styled/Button";
import { useLazyDeleteCurrentAccountQuery } from "@/app/services/auth";
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
