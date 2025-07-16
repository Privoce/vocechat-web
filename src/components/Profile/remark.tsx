import React, { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../app/store";
import Input from "../styled/Input";
import IconEdit from "@/assets/icons/edit.svg";
import StyledButton from "../styled/Button";
import { useUpdateRemarkMutation } from "../../app/services/user";
import { useTranslation } from "react-i18next";
import ServerVersionChecker from "../ServerVersionChecker";

type Props = {
  uid: number;
};

const Remark = ({ uid }: Props) => {
  const { t } = useTranslation("chat");
  const { t: ct } = useTranslation("common", { keyPrefix: "action" });
  const [updateRemark, { isLoading }] = useUpdateRemarkMutation();
  const [editMode, setEditMode] = useState(false);
  const remark = useAppSelector((store) => store.footprint.remarkMap[uid] || "");
  const [input, setInput] = useState(remark);
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };
  const handleOK = async () => {
    const { error } = await updateRemark({ contact_uid: uid, remark: input });
    if (!error) {
      setEditMode(false);
    }
  };
  return (
    <ServerVersionChecker empty version="0.5.0">
      <div className="flex items-center gap-1 text-white py-2">
        {editMode ? (
          <div className="flex flex-col gap-2">
            <Input
              onChange={handleChange}
              value={input}
              placeholder={t("remark_placeholder")}
              className="small"
            />
            <div className="flex items-center gap-2">
              <StyledButton disabled={isLoading} onClick={handleOK} className="small">
                {ct("yes")}
              </StyledButton>
              <StyledButton onClick={setEditMode.bind(null, false)} className="small ghost">
                {ct("cancel")}
              </StyledButton>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span>{remark}</span>
            <button className="flex items-center gap-1" onClick={setEditMode.bind(null, true)}>
              {!remark && t("remark")}
              <IconEdit />
            </button>
          </div>
        )}
      </div>
    </ServerVersionChecker>
  );
};

export default Remark;
