import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useLazyClearAllFilesQuery, useLazyClearAllMessagesQuery } from "@/app/services/server";
import Modal from "@/components/Modal";
import Button from "@/components/styled/Button";
import StyledModal from "@/components/styled/Modal";
import { VisibleModalType } from "./index";
import useLogout from "@/hooks/useLogout";

interface Props {
  context: VisibleModalType;
  title: string;
  desc: string;
  closeModal: () => void;
}

const ClearConfirmModal: FC<Props> = ({ context, title, desc, closeModal }) => {
  // const { t } = useTranslation("auth");
  const { clearLocalData } = useLogout();
  const { t: ct } = useTranslation();
  const [clearFiles, { isLoading: filesClearing, isSuccess: clearFilesSuccess }] =
    useLazyClearAllFilesQuery();
  const [clearMessages, { isLoading: msgClearing, isSuccess: clearMsgSuccess }] =
    useLazyClearAllMessagesQuery();
  const handleClear = () => {
    //todo
    switch (context) {
      case "chat":
        clearMessages();
        break;
      case "files":
        clearFiles();
        break;
      default:
        break;
    }
  };
  const clearSuccess = clearFilesSuccess || clearMsgSuccess;
  useEffect(() => {
    if (clearSuccess) {
      toast.success("Clear success");
      closeModal();
    }
  }, [clearSuccess]);

  const clearing = msgClearing || filesClearing;
  return (
    <Modal id="modal-modal">
      <StyledModal
        title={title}
        description={desc}
        buttons={
          <>
            <Button className="cancel" onClick={closeModal}>
              {ct("action.cancel")}
            </Button>
            <Button onClick={handleClear} className="danger">
              {clearing ? "Clearing" : ct("action.remove")}
            </Button>
          </>
        }
      ></StyledModal>
    </Modal>
  );
};

export default ClearConfirmModal;
