import { useUpdateChannelMutation, useLazyLeaveChannelQuery } from "../../app/services/channel";
import { useAppSelector } from "../../app/store";

export default function useLeaveChannel(cid: number) {
  const { channel, loginUid } = useAppSelector((store) => {
    return { channel: store.channels.byId[cid], loginUid: store.authData.user?.uid };
  });
  const [update, { isLoading: transfering, isSuccess: transferSuccess }] =
    useUpdateChannelMutation();
  const [leave, { isLoading: leaving, isSuccess: leaveSuccess }] = useLazyLeaveChannelQuery();
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
    transferSuccess
  };
}
