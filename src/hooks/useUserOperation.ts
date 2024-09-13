import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch } from "react-redux";
// import { ContentTypes } from "@/app/config";
import { useMatch, useNavigate } from "react-router-dom";
import { hideAll } from "tippy.js";

import { useRemoveMembersMutation } from "@/app/services/channel";
import {
  useLazyDeleteUserQuery,
  useUpdateContactStatusMutation,
  useUpdateUserMutation
} from "@/app/services/user";
import { updateDMVisibleAside } from "@/app/slices/footprint";
import { updateCallInfo } from "@/app/slices/voice";
import { useAppSelector } from "@/app/store";
import { useVoice } from "@/components/Voice";
import useCopy from "./useCopy";

interface IProps {
  uid?: number;
  cid?: number;
}
const useUserOperation = ({ uid, cid }: IProps) => {
  const {
    joinVoice,
    joined,
    joining = false,
    joinedAtThisContext
  } = useVoice({ id: uid ?? 0, context: "dm" });
  const dispatch = useDispatch();
  const { t: ct } = useTranslation();
  const [passedUid, setPassedUid] = useState<number | undefined>(undefined);
  const isUserDetailPath = useMatch(`/users/${uid}`);
  const [updateContactStatus] = useUpdateContactStatusMutation();
  const [updateUser, { isSuccess: updateUserSuccess }] = useUpdateUserMutation();
  const [removeUser, { isSuccess: removeUserSuccess }] = useLazyDeleteUserQuery();
  const [removeInChannel, { isSuccess: removeSuccess }] = useRemoveMembersMutation();
  const navigateTo = useNavigate();
  const { copy } = useCopy();
  const user = useAppSelector(
    (store) => (typeof uid !== "undefined" ? store.users.byId[uid] : undefined),
    shallowEqual
  );
  const channel = useAppSelector(
    (store) => (typeof cid !== "undefined" ? store.channels.byId[cid] : undefined),
    shallowEqual
  );
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const { show_email = true, dm_to_member = true } = channel ?? {};
  useEffect(() => {
    setPassedUid(uid ?? loginUser?.uid);
  }, [uid, loginUser]);

  useEffect(() => {
    if (updateUserSuccess) {
      toast.success(ct("tip.update"));
    }
  }, [updateUserSuccess]);

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
    // 实时显示 calling box
    if (!joinedAtThisContext) {
      dispatch(updateCallInfo({ from: loginUser?.uid ?? 0, to: uid, calling: false }));
    }
    navigateTo(`/chat/dm/${uid}`);
  };
  const startChat = () => {
    navigateTo(`/chat/dm/${uid}`);
  };
  const updateRole = () => {
    if (uid) {
      updateUser({ id: uid, is_admin: !user?.is_admin });
    }
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

  const loginUserIsAdmin = !!loginUser?.is_admin;
  const loginUid = loginUser?.uid;
  const canDeleteChannel = !!cid && !channel?.is_public && loginUserIsAdmin;
  const canRemoveFromChannel =
    !!cid &&
    !channel?.is_public &&
    (loginUserIsAdmin || channel?.owner == loginUid) &&
    uid != channel?.owner;
  const canRemove: boolean = loginUserIsAdmin && loginUid != uid && !cid && uid !== 1;
  const canBlock: boolean = loginUid != uid;
  const canRemoveFromContact: boolean = loginUid != uid;
  const canInviteChannel = !!cid && (loginUser?.is_admin || channel?.owner == loginUser?.uid);
  return {
    showEmailInChannel: show_email,
    isChannelOwner: loginUser?.uid == channel?.owner || (channel?.is_public && loginUserIsAdmin),
    isAdmin: !!user?.is_admin,
    updateRole,
    canUpdateRole: loginUserIsAdmin && loginUid != uid && uid != 1,
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
    canCopyEmail: !!user?.email && show_email,
    copyEmail,
    canDM: dm_to_member,
    startCall
  };
};
export default useUserOperation;
