// import React from 'react'
import { useSelector } from "react-redux";
import {
  useUpdateChannelMutation,
  useLazyLeaveChannelQuery,
} from "../../app/services/channel";
export default function useLeaveChannel(cid = null) {
  const { channel, loginUid } = useSelector((store) => {
    return { channel: store.channels.byId[cid], loginUid: store.authData.uid };
  });
  const [
    update,
    { isLoading: transfering, isSuccess: transferSuccess },
  ] = useUpdateChannelMutation();
  const [
    leave,
    { isLoading: leaving, isSuccess: leaveSuccess },
  ] = useLazyLeaveChannelQuery();
  const transferOwner = (uid = null) => {
    if (!uid) return;
    update({ id: cid, owner: uid });
  };
  const leaveChannel = () => {
    if (!cid) return;
    leave(cid);
  };
  const isOwner = loginUid == channel.owner;
  const otherMembers = channel.members.filter((m) => m != loginUid);
  return {
    otherMembers,
    transferOwner,
    leaveChannel,
    leaving,
    leaveSuccess,
    isOwner,
    transfering,
    transferSuccess,
  };
}
