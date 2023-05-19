import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useUpdateUserMutation } from "../../../app/services/user";
import Modal from "../../../components/Modal";
import Button from "../../../components/styled/Button";
import Input from "../../../components/styled/Input";
import StyledModal from "../../../components/styled/Modal";

type Props = {
  uid: number;
  webhook?: string;
  closeModal: () => void;
};
const WebhookModal = ({ uid, webhook, closeModal }: Props) => {
  const [url, setUrl] = useState(webhook);
  const [updateUser, { isSuccess, isLoading }] = useUpdateUserMutation();
  const formRef = useRef(null);
  const { t } = useTranslation("setting", { keyPrefix: "bot" });
  const { t: ct } = useTranslation();
  // const [input, setInput] = useState("");
  const handleUrlChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
  };
  const handleUpdateWebhook = () => {
    if (!formRef || !formRef.current) return;
    const formEle = formRef.current as HTMLFormElement;
    if (!formEle.checkValidity()) {
      formEle.reportValidity();
      return;
    }
    const myFormData = new FormData(formEle);
    const webhook_url = myFormData.get("webhook")?.toString() || "";
    updateUser({
      id: uid,
      webhook_url
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(ct("tip.update"));
      closeModal();
    }
  }, [isSuccess]);

  return (
    <Modal id="modal-modal">
      <StyledModal
        title={t("webhook_title")}
        description={t("webhook_desc")}
        buttons={
          <>
            <Button className="cancel" onClick={closeModal.bind(null, undefined)}>
              {ct("action.cancel")}
            </Button>
            <Button disabled={!url} onClick={handleUpdateWebhook}>
              {isLoading ? "Updating" : ct("action.done")}
            </Button>
          </>
        }
      >
        <form ref={formRef} className="w-full flex flex-col gap-2" action="/">
          <label htmlFor={"webhook"} className="text-sm text-gray-500">
            Webhook URL
          </label>
          <Input name={"webhook"} value={url} onChange={handleUrlChange} type="url"></Input>
        </form>
      </StyledModal>
    </Modal>
  );
};

export default WebhookModal;
