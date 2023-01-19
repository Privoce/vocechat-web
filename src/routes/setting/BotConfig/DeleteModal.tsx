import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLazyDeleteUserQuery } from '../../../app/services/user';
import Modal from '../../../common/component/Modal';
import Button from '../../../common/component/styled/Button';
import StyledModal from '../../../common/component/styled/Modal';

type Props = {
    uid: number,
    name: string,
    closeModal: () => void
}
const DeleteModal = ({ closeModal, uid, name }: Props) => {
    const [deleteUser, { isSuccess, isLoading }] = useLazyDeleteUserQuery();
    const { t } = useTranslation("setting", { keyPrefix: "bot" });
    const { t: ct } = useTranslation();
    // const [input, setInput] = useState("");
    const handleDeleteBot = () => {
        deleteUser(uid);
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success(ct("tip.delete"));
            closeModal();
        }
    }, [isSuccess]);

    return (
        <Modal id="modal-modal">
            <StyledModal
                title={`${t("delete_title")} ${name}`}
                description={t("delete_desc")}
                buttons={
                    <>
                        <Button className="cancel" onClick={closeModal.bind(null, undefined)}>
                            {ct("action.cancel")}
                        </Button>
                        <Button className='danger' onClick={handleDeleteBot}>{isLoading ? "Deleting" : ct("action.done")}</Button>
                    </>
                }
            >
            </StyledModal>
        </Modal>
    );
};

export default DeleteModal;