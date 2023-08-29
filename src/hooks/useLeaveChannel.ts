import { useLazyLeaveChannelQuery, useUpdateChannelMutation } from "@/app/services/channel";
import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";

export default function useLeaveChannel(cid: number) {
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const channel = useAppSelector((store) => store.channels.byId[cid], shallowEqual);
  const [update, { isLoading: transferring, isSuccess: transferSuccess }] =
    useUpdateChannelMutation();
  const [leave, { isLoading: leaving, isSuccess: leaveSuccess }] = useLazyLeaveChannelQuery();
  const transferOwner = (uid: number) => {
    if (!uid) return;
    update({ id: cid, owner: uid });
  };
  const leaveChannel = () => {
    if (!cid) return;
    leave(cid);
  };
  const isOwner = loginUid == channel?.owner;
  const otherMembers = channel?.members.filter((m) => m != loginUid) || [];
  return {
    otherMembers,
    transferOwner,
    leaveChannel,
    leaving,
    leaveSuccess,
    isOwner,
    transferring,
    transferSuccess
  };
}
