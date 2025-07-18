import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import StyledButton from "./styled/Button";
import Input from "./styled/Input";
import { useUpdateRemarkMutation } from "../app/services/user";
import { useAppSelector } from "../app/store";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import ServerVersionChecker from "./ServerVersionChecker";

type Props = {
  uid: number;
  visible: boolean;
  updateVisible: (_visible: boolean) => void;
};

const NicknameModal = ({ visible, updateVisible, uid }: Props) => {
  const remark = useAppSelector((store) => store.footprint.remarkMap[uid] || "");
  const [updateRemark, { isLoading }] = useUpdateRemarkMutation();
  const { t } = useTranslation("chat");
  const { t: ct } = useTranslation("common", { keyPrefix: "action" });
  const [input, setInput] = useState(remark);
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };
  const handleOK = async () => {
    const { error } = await updateRemark({ contact_uid: uid, remark: input });
    if (!error) {
      updateVisible(false);
    } else {
      toast.error("failed");
    }
  };
  if (!visible) return null;
  return (
    <Modal>
      <ServerVersionChecker version="0.5.0">
        <div className="px-4 py-4 flex flex-col bg-white dark:bg-gray-900 max-w-96 rounded-lg relative">
          <h2 className="z-50 py-2 bg-white dark:bg-gray-900 flex items-center justify-between text-lg text-gray-700 dark:text-gray-50 sticky top-0">
            {t("remark")}
          </h2>
          <p className="text-sm text-gray-500">{t("remark_intro")}</p>
          <div className="py-2 flex flex-col gap-2 items-start my-4">
            <Input
              placeholder={t("remark_placeholder")}
              name="nickname"
              value={input}
              onChange={handleChange}
            />
            <button onClick={setInput.bind(null, "")} className="text-primary-500 text-sm">
              {t("remark_clear")}
            </button>
          </div>
          <div className="flex items-center gap-2 justify-end w-full">
            <StyledButton disabled={isLoading} onClick={handleOK} className="small">
              {ct("yes")}
            </StyledButton>
            <StyledButton onClick={updateVisible.bind(null, false)} className="small ghost">
              {ct("cancel")}
            </StyledButton>
          </div>
        </div>
      </ServerVersionChecker>
    </Modal>
  );
};

export default NicknameModal;
