// import React from "react";
import Modal from "../Modal";
import Input from "../styled/Input";
import StyledButton from "../styled/Button";
import useUserOperation from "@/hooks/useUserOperation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type Props = {
  uid?: number;
  onClose: () => void;
};

const UpdatePassword = ({ uid, onClose }: Props) => {
  const [pwd, setPwd] = useState("");
  const [updating, setUpdating] = useState(false);
  const { t } = useTranslation("auth");
  const { updatePassword } = useUserOperation({ uid });
  const handleUpdate = async () => {
    if (pwd.length < 6) {
      toast.error("Min length is 6");
      return;
    }
    setUpdating(true);
    try {
      await updatePassword(pwd);
      setPwd("");
      onClose();
    } catch {
      // The API handler reports the failure; keep the input for retry.
    } finally {
      setUpdating(false);
    }
  };
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPwd(evt.target.value);
  };
  if (!uid) return null;
  return (
    <Modal>
      <div className="flex flex-col gap-3 py-4 px-6 rounded-md bg-slate-100 dark:bg-slate-900 relative">
        <label htmlFor="pwd" className="dark:text-slate-200">
          Password:
        </label>
        <Input type="password" id="pwd" value={pwd} onChange={handleChange} placeholder="Input New Password" disabled={updating} />
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          {t("logout.password_change_notice")}
        </p>
        <div className="flex items-center gap-2">
          <StyledButton disabled={!pwd || updating} className="small" onClick={handleUpdate}>
            Update
          </StyledButton>
          <StyledButton disabled={updating} className="small cancel" onClick={onClose}>
            Close
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePassword;
