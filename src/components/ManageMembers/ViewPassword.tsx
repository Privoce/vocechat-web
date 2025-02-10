// import React from "react";
import Modal from "../Modal";
import { useGetUserByAdminQuery } from "@/app/services/user";
import Input from "../styled/Input";
import StyledButton from "../styled/Button";

type Props = {
  uid?: number;
  onClose: () => void;
};

const ViewPassword = ({ uid, onClose }: Props) => {
  const {  data } = useGetUserByAdminQuery(uid ?? 0, { skip: !uid });
  console.log({ data });

  if (!uid) return null;
  return (
    <Modal>
      <div className="flex flex-col gap-3 py-4 px-6 rounded-md bg-slate-100 dark:bg-slate-900 relative">
        <label htmlFor="pwd" className="dark:text-slate-200">
          Password:
        </label>
        <Input readOnly value={data?.password} placeholder="No Password" />
        <StyledButton className="small" onClick={onClose}>
          Close
        </StyledButton>
      </div>
    </Modal>
  );
};

export default ViewPassword;
