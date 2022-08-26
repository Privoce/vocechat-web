import { FC } from "react";
import toast from "react-hot-toast";
import Modal from "../../common/component/Modal";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";
import { useLazyDeleteCurrentAccountQuery } from "../../app/services/auth";

interface Props {
  closeModal: () => void;
}

const RemoveConfirmModal: FC<Props> = ({ closeModal }) => {
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
        title="Remove Account"
        description="Are you sure remove this account?"
        buttons={
          <>
            <Button onClick={closeModal}>Cancel</Button>
            <Button disabled={isLoading} onClick={handleRemove} className="danger">
              Remove
            </Button>
          </>
        }
      ></StyledModal>
    </Modal>
  );
};

export default RemoveConfirmModal;
