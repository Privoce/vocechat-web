import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "@/i18n";
import clsx from "clsx";

import { useCreateChannelMutation, useSendChannelMsgMutation } from "@/app/services/channel";
import { useAppSelector } from "@/app/store";
import { CreateChannelDTO } from "@/types/channel";
import useFilteredUsers from "@/hooks/useFilteredUsers";
import ChannelIcon from "../ChannelIcon";
import Modal from "../Modal";
import Button from "../styled/Button";
import StyledCheckbox from "../styled/Checkbox";
import StyledToggle from "../styled/Toggle";
import User from "../User";
import { shallowEqual } from "react-redux";

interface Props {
  personal?: boolean;
  closeModal: () => void;
}

const ChannelModal: FC<Props> = ({ personal = false, closeModal }) => {
  const { t } = useTranslation("chat");
  const navigateTo = useNavigate();
  const [sendMessage] = useSendChannelMsgMutation();
  const channelData = useAppSelector((store) => store.channels.byId, shallowEqual);
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const [data, setData] = useState<CreateChannelDTO>({
    name: "",
    description: "",
    members: loginUser?.uid ? [loginUser.uid] : [],
    is_public: !personal
  });

  const { users, input, updateInput } = useFilteredUsers();
  const [createChannel, { isSuccess, isError, isLoading, data: newChannel }] =
    useCreateChannelMutation();

  const handleToggle = () => {
    const { is_public } = data;
    setData((prev) => {
      return { ...prev, is_public: !is_public };
    });
  };
  const handleCreate = () => {
    // todo: add field validation (maxLength, text format, trim)
    if (!data.name) {
      toast("please input channel name");
      return;
    }
    if (data.is_public) {
      // 公共频道 不必有 members
      delete data.members;
    }
    createChannel(data);
  };

  // todo: delete the following code and use common error handler instead
  useEffect(() => {
    if (isError) {
      toast.error("create new channel failed");
    }
  }, [isError]);

  useEffect(() => {
    const id = typeof newChannel == "object" ? newChannel.gid : newChannel;
    if (isSuccess && id && channelData[id]) {
      const name = channelData[id].name;
      // 发个欢迎消息
      const welcome = i18n.t("welcome_msg", { ns: "chat", name }) ?? "";
      sendMessage({ id, content: welcome, from_uid: loginUser?.uid, type: "text" });
      closeModal();
      toast.success("create new channel success");
      navigateTo(`/chat/channel/${id}`);
    }
  }, [isSuccess, newChannel, channelData]);

  const handleNameInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, name: evt.target.value }));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    updateInput(evt.target.value);
  };

  const toggleCheckMember = ({ currentTarget }: MouseEvent<HTMLLIElement>) => {
    const members = data.members ?? [];
    const { uid } = currentTarget.dataset;
    const uidNum = Number(uid);
    const tmp = members.includes(uidNum)
      ? members.filter((m) => m != uidNum)
      : [...members, uidNum];
    setData((prev) => ({ ...prev, members: tmp }));
  };

  if (!loginUser) return null;
  const { name, members, is_public } = data;
  const loginUid = loginUser.uid;
  return (
    <Modal>
      <div className="flex flex-col md:flex-row max-h-screen md:max-h-[402px] bg-white dark:bg-gray-800 drop-shadow rounded-lg">
        {!is_public && (
          <div className="md:w-[260px] md:shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)]">
            <div className="sticky top-0 z-[99] rounded-tl-lg shadow-[0px_1px_0px_rgba(0,_0,_0,_0.1)] p-2 w-[calc(100%_-_1px)]">
              <input
                className="outline-none p-2 text-sm w-full bg-transparent dark:text-white"
                value={input}
                onChange={handleInputChange}
                placeholder={t("search_user_placeholder")}
              />
            </div>
            {users && (
              <ul className="flex flex-col overflow-y-scroll overflow-x-hidden max-h-80 md:h-[calc(100%_-_52px_-_10px)]">
                {users.map((u) => {
                  const { uid } = u;
                  const checked = members ? members.includes(uid) : false;
                  return (
                    <li
                      key={uid}
                      data-uid={uid}
                      className="cursor-pointer flex items-center px-4 rounded md:hover:bg-gray-500/10"
                      onClick={loginUid == uid ? undefined : toggleCheckMember}
                    >
                      <StyledCheckbox
                        disabled={loginUid == uid}
                        readOnly
                        checked={checked}
                        name="cb"
                        id="cb"
                      />
                      <User uid={uid} interactive={false} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
        <div
          className={clsx(
            `w-80 md:min-w-[400px] flex flex-col items-center p-8 box-border`,
            !is_public && "w-[344px] justify-evenly"
          )}
        >
          <h3 className="font-semibold text-xl text-gray-600 mb-4 dark:text-white">
            {t("create_channel")}
          </h3>
          <p className="text-gray-400 mb-2 md:mb-12 text-sm font-normal">
            {!is_public ? t("create_private_channel_desc") : t("create_channel_desc")}
          </p>
          <div className="w-full flex flex-col justify-start gap-2 mb-2 md:mb-8">
            <span className="text-gray-400 text-sm font-normal">{t("channel_name")}</span>
            <div className="relative">
              <input
                className="text-gray-600 dark:text-gray-300 rounded p-2 pl-9 border border-solid border-gray-300 w-full bg-transparent"
                onChange={handleNameInput}
                value={name}
                placeholder="new channel"
              />
              <ChannelIcon
                personal={!is_public}
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-between mb-8 md:mb-12">
            <span className="text-gray-400 text-sm">{t("private_channel")}</span>
            <StyledToggle
              checked={!is_public}
              disabled={!loginUser?.is_admin}
              onClick={handleToggle}
            />
          </div>
          <div className="w-full flex gap-4 items-center justify-end">
            <Button onClick={closeModal} className="text-sm cancel">
              {t("action.cancel", { ns: "common" })}
            </Button>
            <Button disabled={isLoading} onClick={handleCreate} className="text-sm">
              {t("action.create", { ns: "common" })}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChannelModal;
