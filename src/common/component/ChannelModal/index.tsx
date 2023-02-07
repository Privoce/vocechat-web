import { useState, useEffect, FC, MouseEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Button from "../styled/Button";
import ChannelIcon from "../ChannelIcon";
import User from "../User";
import StyledCheckbox from "../styled/Checkbox";
import StyledToggle from "../../component/styled/Toggle";
import useFilteredUsers from "../../hook/useFilteredUsers";
import { useCreateChannelMutation } from "../../../app/services/channel";
import { useAppSelector } from "../../../app/store";
import { CreateChannelDTO } from "../../../types/channel";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

interface Props {
  personal?: boolean;
  closeModal: () => void;
}

const ChannelModal: FC<Props> = ({ personal = false, closeModal }) => {
  const { t } = useTranslation("chat");
  const { usersData, loginUid } = useAppSelector((store) => {
    return { usersData: store.users.byId, loginUid: store.authData.user?.uid };
  });
  const navigateTo = useNavigate();
  const [data, setData] = useState<CreateChannelDTO>({
    name: "",
    description: "",
    members: loginUid ? [Number(loginUid)] : [],
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
      // 公共频道 不必有members
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
    if (isSuccess && newChannel) {
      toast.success("create new channel success");
      closeModal();
      const id = typeof newChannel == 'object' ? newChannel.gid : newChannel;
      navigateTo(`/chat/channel/${id}`);
    }
  }, [isSuccess, newChannel]);

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
    let tmp = members.includes(uidNum) ? members.filter((m) => m != uidNum) : [...members, uidNum];
    setData((prev) => ({ ...prev, members: tmp }));
  };

  if (!loginUid) return null;
  const loginUser = usersData[Number(loginUid)];
  if (!loginUser) return null;
  const { name, members, is_public } = data;

  return (
    <Modal>
      <div className="flex max-h-[402px] bg-white dark:bg-gray-800 drop-shadow rounded-lg">
        {!is_public && (
          <div className="w-[260px] shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)]">
            <div className="sticky top-0 z-[99] rounded-tl-lg shadow-[0px_1px_0px_rgba(0,_0,_0,_0.1)] p-2 w-[calc(100%_-_1px)]">
              <input
                className="outline-none p-2 text-sm w-full bg-transparent dark:text-white"
                value={input}
                onChange={handleInputChange}
                placeholder={t("search_user_placeholder")}
              />
            </div>
            {users && (
              <ul className="flex flex-col overflow-y-scroll overflow-x-hidden h-[calc(100%_-_52px_-_10px)]">
                {users.map((u) => {
                  const { uid } = u;
                  const checked = members ? members.includes(uid) : false;
                  return (
                    <li
                      key={uid}
                      data-uid={uid}
                      className="cursor-pointer flex items-center px-4 rounded hover:bg-gray-500/10"
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
        <div className={clsx(`min-w-[400px] flex flex-col items-center p-8 box-border`, !is_public && "w-[344px] justify-evenly")}>
          <h3 className="font-semibold text-xl text-gray-600 mb-4 dark:text-white">{t("create_channel")}</h3>
          <p className="text-gray-400 mb-12 text-sm font-normal">
            {!is_public
              ? t("create_private_channel_desc")
              : t("create_channel_desc")}
          </p>
          <div className="w-full flex flex-col justify-start gap-2 mb-8">
            <span className="text-gray-400 text-sm font-normal">{t("channel_name")}</span>
            <div className="relative">
              <input className="text-gray-600 rounded p-2 pl-9 border border-solid border-gray-300 w-full" onChange={handleNameInput} value={name} placeholder="new channel" />
              <ChannelIcon personal={!is_public} className="absolute left-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="w-full flex items-center justify-between mb-12">
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
