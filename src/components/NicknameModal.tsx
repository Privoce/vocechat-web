import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import StyledButton from "./styled/Button";
import Input from "./styled/Input";
import { useUpdateRemarkMutation } from "../app/services/user";
import { useAppSelector } from "../app/store";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

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
      <div className="px-3 py-4 flex flex-col bg-white dark:bg-gray-900 rounded-lg max-h-[85vh] overflow-y-scroll  md:min-w-[408px] relative">
        <h2 className="z-50 py-2 bg-white dark:bg-gray-900 flex items-center justify-between text-lg text-gray-700 dark:text-gray-50 sticky top-0">
          {t("remark")}
        </h2>
        <p className="text-sm text-gray-500">{t("remark_intro")}</p>
        <div className="py-2 flex flex-col gap-2 items-start my-4">
          {/* <label className="dark:text-white text-sm pb-2" htmlFor="nickname">
            {t("remark")}
          </label> */}
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
    </Modal>
  );
};

export default NicknameModal;
