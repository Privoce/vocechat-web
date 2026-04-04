import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import toast from "react-hot-toast";

import BASE_URL from "@/app/config";
import { useSearchUserMutation, useUpdateContactStatusMutation } from "@/app/services/user";
import { useAppSelector } from "@/app/store";
import IconClose from "@/assets/icons/close.svg";
import IconSearch from "@/assets/icons/search.svg";
import Avatar from "./Avatar";
import Modal from "./Modal";
import StyledButton from "./styled/Button";
import Input from "./styled/Input";
import { shallowEqual } from "react-redux";

type Props = {
  closeModal: () => void;
};
type Type = "id" | "email" | "name";

const SearchUser: FC<Props> = ({ closeModal }) => {
  const [updateContactStatus, { isLoading: adding, error: addContactError }] =
    useUpdateContactStatusMutation();
  const usersData = useAppSelector((store) => store.users.byId, shallowEqual);
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);
  const addFriendEnable = useAppSelector(
    (store) => store.server.add_friend_enable ?? true,
    shallowEqual
  );
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const inputRef = useRef(null);
  const [type, setType] = useState<Type>("name");
  const [input, setInput] = useState({
    id: "",
    email: "",
    name: ""
  });
  const [searchUser, { data, isSuccess, isLoading, isError, reset, error: searchError }] =
    useSearchUserMutation();
  const isSearchDisabled =
    !!searchError &&
    "data" in searchError &&
    typeof searchError.data === "string" &&
    (searchError.data as string).includes("disabled by the administrator") &&
    // text/plain 403 → status='PARSING_ERROR', originalStatus=403
    // json 403      → status=403
    (("originalStatus" in searchError && searchError.originalStatus === 403) ||
      ("status" in searchError && searchError.status === 403));
  useEffect(() => {
    if (!isSearchDisabled) return;
    toast.error(t("search_disabled", { ns: "member" }));
  }, [isSearchDisabled]);
  useEffect(() => {
    if (!addContactError) return;
    const err = addContactError as any;
    const httpStatus: number = err?.originalStatus ?? err?.status;
    const errData: string = typeof err?.data === "string" ? err.data : "";
    toast.error(
      httpStatus === 403 && errData.includes("disabled by the administrator")
        ? t("add_friend_disabled", { ns: "member" })
        : t("tip.update_failed", { ns: "common", defaultValue: "Operation failed" })
    );
  }, [addContactError]);
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const tmp = {
      [type]: evt.target.value
    };
    setInput((prev) => ({ ...prev, ...tmp }));
  };
  const resetInput = () => {
    reset();
    setInput((prev) => ({ ...prev, [type]: "" }));
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
  const handleSendMsg = () => {
    if (!data) return;
    navigateTo(`/chat/dm/${data.uid}`);
  };
  const handleChangeKeyword = (type: Type) => {
    setType(type);
  };
  const handleChat = async (directChat: boolean) => {
    if (!data) return;
    if (!directChat) {
      const result = await updateContactStatus({ target_uid: data.uid, action: "add" });
      if ("error" in result) return; // toast 由上方 useEffect 处理
    }
    closeModal();
    navigateTo(`/chat/dm/${data.uid}`);
  };
  // const tmpData = { "avatar_updated_at": 0, "birthday": 0, "create_by": "password", "email": "tristan@alex.com", "gender": 0, "is_admin": true, "is_bot": false, "language": "en-US", "name": "Admin", "uid": 1 };
  // const showResult = isSuccess && data;
  const inContact = Boolean(data && usersData[data.uid] && usersData[data.uid].status == "added");
  const inputType = type == "id" ? "number" : type == "email" ? "email" : "text";
  return (
    <Modal>
      <div className=" relative flex flex-col gap-2 w-96 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-slate-900 dark:text-slate-100">
        <div className="flex items-center gap-2 py-2">
          <StyledButton
            className={clsx("mini", type !== "name" && "ghost !border-none !shadow-none")}
            onClick={handleChangeKeyword.bind(null, "name")}
          >
            {t("search_by_name", { ns: "member" })}
          </StyledButton>
          <StyledButton
            className={clsx("mini", type !== "email" && "ghost !border-none !shadow-none")}
            onClick={handleChangeKeyword.bind(null, "email")}
          >
            {t("search_by_email", { ns: "member" })}
          </StyledButton>
          <StyledButton
            className={clsx("mini", type !== "id" && "ghost !border-none !shadow-none")}
            onClick={handleChangeKeyword.bind(null, "id")}
          >
            {t("search_by_id", { ns: "member" })}
          </StyledButton>
        </div>
        <form className="w-full" ref={inputRef} action="/" onSubmit={handleSubmit}>
          <Input
            required
            type={inputType}
            className="none"
            disabled={isLoading}
            prefix={<IconSearch className="dark:fill-gray-400 w-6 h-6 shrink-0" />}
            value={input[type]}
            placeholder={`${
              type == "email"
                ? t("search_by_email_ph", { ns: "member" })
                : type == "id"
                ? t("search_by_id_ph", { ns: "member" })
                : t("search_by_name_ph", { ns: "member" })
            }...`}
            onChange={handleInput}
          />
        </form>
        <div className="min-h-[280px] flex-center pb-10">
          {isError ? (
            <div className="w-full h-full text-center flex flex-col gap-3 items-center">
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {isSearchDisabled
                  ? t("search_disabled", { ns: "member" })
                  : t("tip.error", { ns: "common", defaultValue: "Something went wrong" })}
              </span>
              <StyledButton className="mini" onClick={resetInput}>
                Ok
              </StyledButton>
            </div>
          ) : isSuccess ? (
            data ? (
              <div className="flex flex-col items-center pt-10">
                <Avatar
                  className="rounded-full"
                  src={
                    data.avatar_updated_at === 0
                      ? ""
                      : `${BASE_URL}/resource/avatar?uid=${data.uid}&t=${data.avatar_updated_at}`
                  }
                  name={data.name}
                  width={120}
                  height={120}
                />
                <span className="my-2 dark:text-gray-100 text-gray-950">{data.name}</span>
                <div className="flex gap-2 my-2">
                  <StyledButton className="mini ghost" onClick={handleSendMsg}>
                    {t("send_msg", { ns: "member" })}
                  </StyledButton>
                  {!inContact && (isAdmin || addFriendEnable) && (
                    <StyledButton
                      disabled={adding}
                      onClick={handleChat.bind(null, inContact)}
                      className={clsx("mini", inContact && "ghost")}
                    >
                      {t("add_to_contact", { ns: "member" })}
                    </StyledButton>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full text-center flex flex-col gap-3 items-center">
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {t("search_not_found", { ns: "member" })}
                </span>
                <StyledButton className="mini" onClick={resetInput}>
                  Ok
                </StyledButton>
              </div>
            )
          ) : null}
        </div>
        <IconClose
          role="button"
          className="absolute top-2 right-2 dark:fill-white w-5 h-5"
          onClick={closeModal}
        />
      </div>
    </Modal>
  );
};
export default SearchUser;
