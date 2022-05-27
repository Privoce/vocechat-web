import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import { ContentTypes } from "../../../app/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideAll } from "tippy.js";
import { useRemoveMembersMutation } from "../../app/services/channel";
import { useLazyDeleteContactQuery } from "../../app/services/contact";
import useCopy from "./useCopy";

export default function useContactOperation({ uid, cid }) {
  const [passedUid, setPassedUid] = useState(undefined);

  const [
    removeUser,
    { isSuccess: removeUserSuccess },
  ] = useLazyDeleteContactQuery();
  const [
    removeInChannel,
    { isSuccess: removeSuccess },
  ] = useRemoveMembersMutation();
  const navigateTo = useNavigate();
  const { copy } = useCopy();
  const { user, channel, loginUid, isAdmin } = useSelector((store) => {
    return {
      user: store.contacts.byId[uid],
      channel: store.channels.byId[cid],
      loginUid: store.authData.uid,
      isAdmin: store.contacts.byId[store.authData.uid]?.is_admin,
    };
  });
  useEffect(() => {
    setPassedUid(uid ?? loginUid);
  }, [uid, loginUid]);

  useEffect(() => {
    if (removeSuccess || removeUserSuccess) {
      toast.success("Remove Successfully");
      if (removeUserSuccess) {
        navigateTo(`/contacts`);
      }
    }
  }, [removeSuccess, removeUserSuccess]);
  const handleRemoveFromChannel = (id) => {
    const isNumber = !Number.isNaN(+id);
    const finalId = isNumber ? id || passedUid : passedUid;
    removeInChannel({ id: +cid, members: [+finalId] });
    hideAll();
  };
  const handleRemove = (id) => {
    const isNumber = !Number.isNaN(+id);
    const finalId = isNumber ? id || passedUid : passedUid;
    removeUser(finalId);
    hideAll();
  };
  const copyEmail = (email) => {
    const isString = typeof email == "string";
    const finalEmail = isString ? email || user?.email : user?.email;
    copy(finalEmail);
    hideAll();
  };
  const startChat = () => {
    navigateTo(`/chat/dm/${uid}`);
  };
  const call = () => {
    toast.success("Cooming Soon...");
    hideAll();
  };
  const canRemoveFromChannel =
    cid && !channel?.is_public && (isAdmin || channel?.owner == loginUid);
  const canCall = loginUid != uid;
  const canRemove = isAdmin && loginUid != uid;
  return {
    canRemove,
    removeUser: handleRemove,
    startChat,
    removeFromChannel: handleRemoveFromChannel,
    canRemoveFromChannel,
    canCopyEmail: !!user?.email,
    copyEmail,
    canCall,
    call,
  };
}
