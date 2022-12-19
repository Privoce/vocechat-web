import { useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useCreateBotAPIKeyMutation } from '../../../app/services/user';
import Modal from '../../../common/component/Modal';
import Button from '../../../common/component/styled/Button';
import Input from '../../../common/component/styled/Input';
import StyledModal from '../../../common/component/styled/Modal';
import useCopy from '../../../common/hook/useCopy';

type Props = {
    uid: number,
    closeModal: () => void
}
const CreateAPIKeyModal = ({ closeModal, uid }: Props) => {
    const { copy } = useCopy();
    const [createBotAPIKey, { error, isSuccess, isLoading, data }] = useCreateBotAPIKeyMutation();
    const formRef = useRef(null);
    const { t } = useTranslation("setting", { keyPrefix: "bot" });
    const { t: ct } = useTranslation();
    // const [input, setInput] = useState("");
    const handleCreateBot = () => {
        if (!formRef || !formRef.current) return;
        const formEle = formRef.current as HTMLFormElement;
        if (!formEle.checkValidity()) {
            formEle.reportValidity();
            return;

        }
        createBotAPIKey({
            uid,
            name: formEle.querySelector('input')?.value || ""
        });
    };
    useEffect(() => {
        if (error) {
            switch (error.status) {
                case 406:
                    toast.error("Invalid Webhook URL!");
                    break;

                default:
                    break;
            }
        }
    }, [error]);
    const handleCopy = () => {
        copy(data);
        toast.success("API Key Copied!");
        closeModal();
    };

    return (
        <Modal id="modal-modal">
            <StyledModal
                title={t("create_key_title")}
                description={t("create_key_desc")}
                buttons={
                    isSuccess ? <Button onClick={handleCopy}>
                        {t("key_copy_and_close")}
                    </Button> : <>
                        <Button className="cancel" onClick={closeModal}>
                            {ct("action.cancel")}
                        </Button>
                        <Button onClick={handleCreateBot}>{isLoading ? "..." : ct("action.done")}</Button>
                    </>
                }
            >
                {isSuccess ? <div className="flex flex-col gap-2 text-sm">
                    <div className='border-green-600 bg-green-200/50 rounded border border-solid p-2 max-w-md w-full whitespace-pre-wrap break-all' >
                        {data}
                    </div> <div className='text-red-400'>
                        ⚠️ {t("create_key_warning")}
                    </div>
                </div>
                    : <form ref={formRef} className="w-full flex flex-col gap-2 items-center" action="/">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor={"name"} className="text-sm text-[#6b7280]">Name</label>
                            <Input name={"name"} required placeholder='Please input API Key name'></Input>
                        </div>
                    </form>}
            </StyledModal>
        </Modal>
    );
};

export default CreateAPIKeyModal;