import { useState, useEffect, FC } from "react";
import toast from "react-hot-toast";
// import { ContentTypes } from "../../../app/config";
import { useNavigate, useMatch } from "react-router-dom";
import { hideAll } from "tippy.js";
import { useRemoveMembersMutation } from "../../app/services/channel";
import { useLazyDeleteUserQuery } from "../../app/services/user";
import useConfig from "./useConfig";
import useCopy from "./useCopy";
import { useAppSelector } from "../../app/store";
interface Props {
  uid?: number;
  cid?: number;
}
const useUserOperation: FC<Props> = ({ uid, cid }) => {
  const [passedUid, setPassedUid] = useState(undefined);
  const { values: agoraConfig } = useConfig("agora");
  const isUserDetailPath = useMatch(`/users/${uid}`);
  const [removeUser, { isSuccess: removeUserSuccess }] = useLazyDeleteUserQuery();
  const [removeInChannel, { isSuccess: removeSuccess }] = useRemoveMembersMutation();
  const navigateTo = useNavigate();
  const { copy } = useCopy();
  const { user, channel, loginUser } = useAppSelector((store) => {
    return {
      user: store.users.byId[uid],
      channel: store.channels.byId[cid],
      loginUser: store.authData.user
    };
  });

  useEffect(() => {
    setPassedUid(uid ?? loginUser.uid);
  }, [uid, loginUser]);

  useEffect(() => {
    if (removeSuccess || removeUserSuccess) {
      toast.success("Remove Successfully");
      if (removeUserSuccess && isUserDetailPath) {
        navigateTo(`/users`);
      }
    }
  }, [removeSuccess, removeUserSuccess, isUserDetailPath]);

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
  const isAdmin = loginUser?.is_admin;
  const loginUid = loginUser?.uid;
  const canRemoveFromChannel =
    cid && !channel?.is_public && (isAdmin || channel?.owner == loginUid);
  const canCall = agoraConfig.enabled && loginUid != uid;
  const canRemove = isAdmin && loginUid != uid && !cid;

  return {
    canRemove,
    removeUser: handleRemove,
    startChat,
    removeFromChannel: handleRemoveFromChannel,
    canRemoveFromChannel,
    canCopyEmail: !!user?.email,
    copyEmail,
    canCall,
    call
  };
};
export default useUserOperation;
