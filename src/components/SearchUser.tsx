// import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { FC, ChangeEvent, useState, useRef, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import IconClose from "@/assets/icons/close.svg";
import IconSearch from "@/assets/icons/search.svg";
import { useSearchUserMutation, useUpdateContactStatusMutation } from "@/app/services/user";
import BASE_URL from "@/app/config";
import { useAppSelector } from "@/app/store";
import StyledButton from "./styled/Button";
import Input from "./styled/Input";
import Avatar from "./Avatar";
import Modal from "./Modal";

type Props = {
  closeModal: () => void;
};
type Type = "id" | "email";

const SearchUser: FC<Props> = ({ closeModal }) => {
  const [updateContactStatus, { isLoading: adding }] = useUpdateContactStatusMutation();
  const usersData = useAppSelector(store => store.users.byId);
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const inputRef = useRef(null);
  const [type, setType] = useState<Type>("id");
  const [input, setInput] = useState({
    id: "",
    email: ""
  });
  const [searchUser, { data, isSuccess, isLoading, reset }] = useSearchUserMutation();
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const tmp = {
      [type]: evt.target.value
    };
    setInput(prev => ({ ...prev, ...tmp }));
  };
  const resetInput = () => {
    reset();
    setInput(prev => ({ ...prev, [type]: "" }));
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!inputRef.current) return;
    const form = inputRef.current as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const currInput = input[type];
    // if (!currInput) return;
    // return true;
    searchUser({
      search_type: type,
      keyword: currInput
    });
  };

  const handleChangeKeyword = (type: Type) => {
    setType(type);
  };
  const handleChat = async (directChat: boolean) => {
    if (!data) return;
    if (!directChat) {
      await updateContactStatus({ target_uid: data.uid, action: "add" });
    }
    closeModal();
    navigateTo(`/chat/dm/${data.uid}`);
  };
  // const tmpData = { "avatar_updated_at": 0, "birthday": 0, "create_by": "password", "email": "tristan@alex.com", "gender": 0, "is_admin": true, "is_bot": false, "language": "en-US", "name": "Admin", "uid": 1 };
  // const showResult = isSuccess && data;
  const inContact = Boolean(data && usersData[data.uid] && usersData[data.uid].status == "added");
  const inputType = type == "id" ? "number" : "email";
  return (
    <Modal>
      <div className=" relative flex flex-col gap-2 w-96 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-slate-900 dark:text-slate-100">
        <div className="flex items-center gap-2 py-2">
          <StyledButton className={clsx("mini", type == "email" && "ghost !border-none !shadow-none")} onClick={handleChangeKeyword.bind(null, "id")}>
            {t("search_by_id", { ns: "member" })}
          </StyledButton>
          <StyledButton className={clsx("mini", type == "id" && "ghost !border-none !shadow-none")} onClick={handleChangeKeyword.bind(null, "email")}>
            {t("search_by_email", { ns: "member" })}
          </StyledButton>
        </div>
        <form className="w-full" ref={inputRef} action="/" onSubmit={handleSubmit}>
          <Input required type={inputType} className="none" disabled={isLoading} prefix={<IconSearch className="dark:fill-gray-400 w-6 h-6 shrink-0" />} value={input[type]} placeholder={`${t("action.search")}...`} onChange={handleInput} />
        </form>
        <div className="min-h-[280px] flex-center pb-10">
          {isSuccess ? (data ? <div className="flex flex-col items-center pt-10">
            <Avatar className="rounded-full" src={data.avatar_updated_at === 0 ? "" : `${BASE_URL}/resource/avatar?uid=${data.uid}&t=${data.avatar_updated_at}`} name={data.name} width={120} height={120} />
            <span className="my-2 dark:text-gray-100 text-gray-950">{data.name}</span>
            <div className="flex gap-2 my-2">
              <StyledButton className="mini ghost" onClick={resetInput}>{t("action.cancel")}</StyledButton>
              <StyledButton disabled={adding} onClick={handleChat.bind(null, inContact)} className="mini">{inContact ? t(`chat`) : `Add to Contact`}</StyledButton>
            </div>
          </div> : <div className="w-full h-full text-center flex flex-col gap-3 items-center">
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {t("search_not_found", { ns: "member" })}
            </span>
            <StyledButton className="mini" onClick={resetInput}>Ok</StyledButton>
          </div>) : null}
        </div>
        <IconClose role="button" className="absolute top-2 right-2 dark:fill-white w-5 h-5" onClick={closeModal} />
      </div>
    </Modal>
  );
};
export default SearchUser;
