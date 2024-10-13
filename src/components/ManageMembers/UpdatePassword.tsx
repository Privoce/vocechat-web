// import React from "react";
import Modal from "../Modal";
import Input from "../styled/Input";
import StyledButton from "../styled/Button";
import useUserOperation from "@/hooks/useUserOperation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  uid?: number;
  onClose: () => void;
};

const UpdatePassword = ({ uid, onClose }: Props) => {
  const [pwd, setPwd] = useState("");
  const { updatePassword } = useUserOperation({ uid });
  const handleUpdate = () => {
    if (pwd.length < 6) {
      toast.error("Min length is 6");
      return;
    }
    updatePassword(pwd);
    setPwd("");
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
        <Input id="pwd" value={pwd} onChange={handleChange} placeholder="Input New Password" />
        <div className="flex items-center gap-2">
          <StyledButton disabled={!pwd} className="small" onClick={handleUpdate}>
            Update
          </StyledButton>
          <StyledButton className="small cancel" onClick={onClose}>
            Close
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePassword;
