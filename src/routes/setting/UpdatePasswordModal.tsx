import { ChangeEvent, FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useGetCredentialsQuery, useUpdatePasswordMutation } from "@/app/services/auth";
import Modal from "@/components/Modal";
import Button from "@/components/styled/Button";
import Input from "@/components/styled/Input";
import StyledModal from "@/components/styled/Modal";

interface Props {
  closeModal: () => void;
}

interface BaseForm {
  current: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileBasicEditModal: FC<Props> = ({ closeModal }) => {
  const { t } = useTranslation("member");
  const { t: ct } = useTranslation();
  const { data } = useGetCredentialsQuery();
  const [input, setInput] = useState<BaseForm>({
    current: "",
    newPassword: "",
    confirmPassword: ""
  });
  // const dispatch = useDispatch();
  const [updatePassword, { isLoading, isSuccess }] = useUpdatePasswordMutation();
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { type } = evt.target.dataset as { type: keyof BaseForm };
    setInput((prev) => {
      return { ...prev, [type]: evt.target.value };
    });
  };
  const handleUpdate = () => {
    const { current, newPassword } = input;
    updatePassword({ old_password: current, new_password: newPassword });
  };
  const handleCompare = () => {
    const { newPassword, confirmPassword } = input;
    if (newPassword !== confirmPassword) {
      toast.error("Not same with new password");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      // todo
      toast.success(ct("tip.update"));
      closeModal();
    }
  }, [isSuccess]);
  const { current, newPassword, confirmPassword } = input;
  const disableBtn =
    (data?.password && !current) ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword ||
    isLoading;

  const inputClass = `my-4 w-full flex flex-col items-start gap-2`;
  const labelClass = `text-gray-400 font-semibold`;
  return (
    <Modal id="modal-modal">
      <StyledModal
        title={t("change_pwd")}
        description={t("change_pwd_desc")}
        buttons={
          <>
            <Button className="cancel" onClick={closeModal}>
              {t("action.cancel", { ns: "common" })}
            </Button>
            <Button disabled={disableBtn} onClick={handleUpdate}>
              {isLoading ? "Updating" : t("action.update", { ns: "common" })}
            </Button>
          </>
        }
      >
        {data?.password && (
          <div className={inputClass}>
            <label className={labelClass} htmlFor={"current"}>
              {t("current_pwd")}
            </label>
            <Input
              type="password"
              id="current"
              name="current"
              value={current}
              data-type="current"
              onChange={handleChange}
            ></Input>
          </div>
        )}
        <div className={inputClass}>
          <label className={labelClass} htmlFor={"newPassword"}>
            {t("new_pwd")}
          </label>
          <Input
            type="password"
            name={"newPassword"}
            value={newPassword}
            data-type="newPassword"
            onChange={handleChange}
          ></Input>
        </div>
        <div className={inputClass}>
          <label className={labelClass} htmlFor={"confirmPassword"}>
            {t("confirm_new_pwd")}
          </label>
          <Input
            onBlur={handleCompare}
            type="password"
            name={"confirmPassword"}
            value={confirmPassword}
            data-type="confirmPassword"
            onChange={handleChange}
          ></Input>
        </div>
      </StyledModal>
    </Modal>
  );
};

export default ProfileBasicEditModal;
