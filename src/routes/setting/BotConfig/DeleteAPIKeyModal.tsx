import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLazyDeleteBotAPIKeyQuery } from '../../../app/services/user';
import Modal from '../../../common/component/Modal';
import Button from '../../../common/component/styled/Button';
import StyledModal from '../../../common/component/styled/Modal';

type Props = {
    uid: number,
    kid: number,
    closeModal: () => void
}
const DeleteAPIKeyModal = ({ closeModal, uid, kid }: Props) => {
    const [deleteKey, { isSuccess, isLoading }] = useLazyDeleteBotAPIKeyQuery();
    const { t } = useTranslation("setting", { keyPrefix: "bot" });
    const { t: ct } = useTranslation();
    // const [input, setInput] = useState("");
    const handleDeleteBot = () => {
        deleteKey({ uid, kid });
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
                title={`${t("delete_key_title")} ${name}`}
                description={t("delete_key_desc")}
                buttons={
                    <>
                        <Button className="cancel" onClick={closeModal}>
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

export default DeleteAPIKeyModal;