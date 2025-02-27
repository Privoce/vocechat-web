import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useLazyDeleteCurrentAccountQuery } from "@/app/services/auth";
import Modal from "@/components/Modal";
import Button from "@/components/styled/Button";
import StyledModal from "@/components/styled/Modal";
import useLogout from "@/hooks/useLogout";

interface Props {
  closeModal: () => void;
}

const RemoveConfirmModal: FC<Props> = ({ closeModal }) => {
  const { t } = useTranslation("member");
  const [removeCurrentAccount, { isLoading, isSuccess }] = useLazyDeleteCurrentAccountQuery();
  const { clearLocalData } = useLogout();
  const handleRemove = async () => {
    try {
      await removeCurrentAccount();
    } catch (error) {
      console.error(error);
      
      toast.error("Remove Account Failed!");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      clearLocalData(true);
    }
  }, [isSuccess]);

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
