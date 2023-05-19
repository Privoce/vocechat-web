import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import { ContentTypes } from "@/app/config";
import { useNavigate, useMatch } from "react-router-dom";
import { hideAll } from "tippy.js";
import { useTranslation } from "react-i18next";

import { useRemoveMembersMutation } from "@/app/services/channel";
import { useLazyDeleteUserQuery, useUpdateContactStatusMutation } from "@/app/services/user";
import useCopy from "./useCopy";
import { useAppSelector } from "@/app/store";
import { useVoice } from "@/components/Voice";
import { updateCallInfo } from "@/app/slices/voice";
import { updateDMVisibleAside } from "@/app/slices/footprint";
import { useDispatch } from "react-redux";
interface IProps {
  uid?: number;
  cid?: number;
}
const useUserOperation = ({ uid, cid }: IProps) => {
  const { joinVoice, joined, joining = false, joinedAtThisContext } = useVoice({ id: uid ?? 0, context: "dm" });
  const dispatch = useDispatch();
  const { t: ct } = useTranslation();
  const [passedUid, setPassedUid] = useState<number | undefined>(undefined);
  const isUserDetailPath = useMatch(`/users/${uid}`);
  const [updateContactStatus] = useUpdateContactStatusMutation();
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
  const startCall = () => {
    if (joining || joined) {
      alert("You have joined another channel, please leave first!");
      return;
    }
    joinVoice();
    const data = {
      id: uid ?? 0,
      aside: "voice" as const
    };
    dispatch(updateDMVisibleAside(data));
    // 实时显示calling box
    if (!joinedAtThisContext) {
      dispatch(updateCallInfo({ from: loginUser?.uid ?? 0, to: uid, calling: false }));
    }
    navigateTo(`/chat/dm/${uid}`);
  };
  const startChat = () => {
    navigateTo(`/chat/dm/${uid}`);
  };
  const removeFromContact = () => {
    if (uid) {
      updateContactStatus({ target_uid: uid, action: "remove" });
    }
  };
  const blockThisContact = () => {
    if (uid === undefined) return;
    updateContactStatus({ target_uid: uid, action: "block" });
  };
  const unblockThisContact = () => {
    if (uid === undefined) return;
    updateContactStatus({ target_uid: uid, action: "unblock" });
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
  const canBlock: boolean = loginUid != uid;
  const canRemoveFromContact: boolean = loginUid != uid;
  const canInviteChannel = !!cid && (loginUser?.is_admin || channel?.owner == loginUser?.uid);
  return {
    removeFromContact,
    canBlock,
    canRemoveFromContact,
    blocked: user?.status == "blocked",
    blockThisContact,
    unblockThisContact,
    canInviteChannel,
    canDeleteChannel,
    canRemove,
    removeUser: handleRemove,
    startChat,
    removeFromChannel: handleRemoveFromChannel,
    canRemoveFromChannel,
    canCopyEmail: !!user?.email,
    copyEmail,
    startCall
  };
};
export default useUserOperation;
