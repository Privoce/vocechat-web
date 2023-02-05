import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useCreateUserMutation } from '../../../app/services/user';
import Modal from '../../../common/component/Modal';
import Button from '../../../common/component/styled/Button';
import Input from '../../../common/component/styled/Input';
import StyledModal from '../../../common/component/styled/Modal';

type Props = {
    closeModal: () => void
}
type CreateDTO = {
    name: string,
    webhook_url?: string
}
const CreateModal = ({ closeModal }: Props) => {
    const [createUser, { isSuccess, isLoading, error }] = useCreateUserMutation();
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
        const myFormData = new FormData(formEle);
        const formDataObj: CreateDTO = { name: "" };
        myFormData.forEach((value, key) => {
            if (value) {
                formDataObj[key] = value;
            }
        });
        createUser({
            is_bot: true,
            is_admin: false,
            gender: 1,
            email: `bot_${new Date().getTime()}@voce.chat`,
            password: "",
            ...formDataObj
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
    useEffect(() => {
        if (isSuccess) {
            toast.success("Create Bot Successfully!");
            closeModal();
        }
    }, [isSuccess]);

    return (
        <Modal id="modal-modal">
            <StyledModal
                title={t("create_title")}
                description={t("create_desc")}
                buttons={
                    <>
                        <Button className="cancel" onClick={closeModal}>
                            {ct("action.cancel")}
                        </Button>
                        <Button onClick={handleCreateBot}>{isLoading ? "Creating" : ct("action.done")}</Button>
                    </>
                }
            >
                <form ref={formRef} className="w-full flex flex-col gap-2" action="/">
                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor={"name"} className="text-sm text-[#6b7280]">Name</label>
                        <Input name={"name"} required placeholder='Please input bot name'></Input>
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor={"webhook_url"} className="text-sm text-[#6b7280]">Webhook URL (Optional)</label>
                        <Input name={"webhook_url"} type="url" placeholder='Please input webhook url'></Input>
                    </div>
                </form>
            </StyledModal>
        </Modal>
    );
};

export default CreateModal;