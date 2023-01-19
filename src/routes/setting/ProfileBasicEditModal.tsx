import { ChangeEvent, FC, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import Input from "../../common/component/styled/Input";
import { useUpdateInfoMutation } from "../../app/services/user";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";
import Modal from "../../common/component/Modal";
import { useTranslation } from "react-i18next";


interface Props {
  label?: string;
  valueKey?: "name" | "email";
  type?: string;
  value?: string;
  title?: string;
  intro?: string;
  closeModal: () => void;
}

const ProfileBasicEditModal: FC<Props> = ({
  label = "Username",
  valueKey = "name",
  value = "",
  type = "text",
  title = "Change your username",
  intro = "Enter a new username and your existing password.",
  closeModal
}) => {
  const formRef = useRef(null);
  const { t } = useTranslation();
  const [input, setInput] = useState(value);
  const [update, { isLoading, isSuccess }] = useUpdateInfoMutation();
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };
  const handleUpdate = () => {
    if (!formRef || !formRef.current) return;
    const formEle = formRef.current as HTMLFormElement;
    if (!formEle.checkValidity()) {
      formEle.reportValidity();
      return;

    }
    update({ [valueKey]: input });
  };
  useEffect(() => {
    if (isSuccess) {
      // todo
      toast.success(t("tip.update"));
      closeModal();
    }
  }, [isSuccess]);
  return (
    <Modal id="modal-modal">
      <StyledModal
        title={title}
        description={intro}
        buttons={
          <>
            <Button className="cancel" onClick={closeModal}>
              {t("action.cancel")}
            </Button>
            <Button onClick={handleUpdate}>{isLoading ? "Updating" : t("action.done")}</Button>
          </>
        }
      >
        <form ref={formRef} className="flex flex-col gap-2 w-full" action="/">
          <label htmlFor={valueKey} className="text-sm text-[#6b7280]">{label}</label>
          <Input name={valueKey} value={input} onChange={handleChange} type={type} required></Input>
        </form>
      </StyledModal>
    </Modal>
  );
};

export default ProfileBasicEditModal;
