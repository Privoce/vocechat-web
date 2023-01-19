import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import { ContentTypes } from "../../../app/config";
import { useNavigate, useMatch } from "react-router-dom";
import { hideAll } from "tippy.js";
import { useRemoveMembersMutation } from "../../app/services/channel";
import { useLazyDeleteUserQuery } from "../../app/services/user";
// import useConfig from "./useConfig";
import useCopy from "./useCopy";
import { useAppSelector } from "../../app/store";
import { useTranslation } from "react-i18next";
// import { AgoraConfig } from "../../types/server";
interface IProps {
  uid?: number;
  cid?: number;
}
const useUserOperation = ({ uid, cid }: IProps) => {
  const { t: ct } = useTranslation();
  const [passedUid, setPassedUid] = useState<number | undefined>(undefined);
  const isUserDetailPath = useMatch(`/users/${uid}`);
  const [removeUser, { isSuccess: removeUserSuccess }] = useLazyDeleteUserQuery();
  const [removeInChannel, { isSuccess: removeSuccess }] = useRemoveMembersMutation();
  const navigateTo = useNavigate();
  const { copy } = useCopy();
  const { user, channel, loginUser } = useAppSelector((store) => {
    return {
      user: typeof uid !== "undefined" ? store.users.byId[uid] : uid,
      channel: typeof cid !== "undefined" ? store.channels.byId[cid] : cid,
      loginUser: store.authData.user
    };
  });

  useEffect(() => {
    setPassedUid(uid ?? loginUser?.uid);
  }, [uid, loginUser]);

  useEffect(() => {
    if (removeSuccess || removeUserSuccess) {
      toast.success(ct("tip.delete"));
      if (removeUserSuccess && isUserDetailPath) {
        navigateTo(`/users`);
      }
    }
  }, [removeSuccess, removeUserSuccess, isUserDetailPath]);

  const handleRemoveFromChannel = (id: number) => {
    if (!cid) return;
    const isNumber = !Number.isNaN(+id);
    const finalId = isNumber ? id || passedUid : passedUid;
    if (!finalId) return;
    removeInChannel({ id: +cid, members: [+finalId] });
    hideAll();
  };

  const handleRemove = (id: number) => {
    const isNumber = !Number.isNaN(+id);
    const finalId = isNumber ? id || passedUid : passedUid;
    if (finalId) {
      removeUser(finalId);
      hideAll();
    }
  };

  const copyEmail = (email: string) => {
    const isString = typeof email == "string";
    const finalEmail = isString ? email || user?.email : user?.email;
    copy(finalEmail || "");
    hideAll();
  };

  const startChat = () => {
    navigateTo(`/chat/dm/${uid}`);
  };

  const isAdmin = !!loginUser?.is_admin;
  const loginUid = loginUser?.uid;
  const canDeleteChannel = !!cid && !channel?.is_public && isAdmin;
  const canRemoveFromChannel =
    !!cid &&
    !channel?.is_public &&
    (isAdmin || channel?.owner == loginUid) &&
    uid != channel?.owner;
  const canRemove: boolean = isAdmin && loginUid != uid && !cid && uid !== 1;

  return {
    canDeleteChannel,
    canRemove,
    removeUser: handleRemove,
    startChat,
    removeFromChannel: handleRemoveFromChannel,
    canRemoveFromChannel,
    canCopyEmail: !!user?.email,
    copyEmail,
  };
};
export default useUserOperation;
