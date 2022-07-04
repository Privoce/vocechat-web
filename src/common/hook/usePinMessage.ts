import { useState, useEffect } from "react";
import { usePinMessageMutation, useUnpinMessageMutation } from "../../app/services/message";
import { useAppSelector } from "../../app/store";
import { PinnedMessage } from "../../types/channel";

export default function usePinMessage(cid: number) {
  const [pins, setPins] = useState<PinnedMessage[]>([]);
  const { channel, loginUser } = useAppSelector((store) => {
    return {
      channel: store.channels.byId[cid],
      loginUser: store.authData.user
    };
  });
  const [pin, { isError, isLoading, isSuccess }] = usePinMessageMutation();
  const [unpin, { isError: isUnpinError, isLoading: isUnpining, isSuccess: isUnpinSuccess }] =
    useUnpinMessageMutation();
  const pinMessage = (mid: number) => {
    if (!mid || !cid) return;
    pin({ mid, gid: +cid });
  };
  const unpinMessage = (mid: number) => {
    if (!mid || !cid) return;
    unpin({ mid, gid: +cid });
  };
  const getPinInfo = (mid: number) => {
    if (!cid || !channel) return;
    const pins = channel.pinned_messages;
    if (!pins || pins.length == 0) return;
    const pinned = pins.find((p) => p.mid == mid);
    return pinned;
  };
  useEffect(() => {
    if (channel) {
      setPins(channel.pinned_messages);
    }
  }, [channel]);

  return {
    getPinInfo,
    channel,
    pins,
    canPin: loginUser?.is_admin || channel?.owner == loginUser?.uid,
    pinMessage,
    unpinMessage,
    isError,
    isPining: isLoading,
    isSuccess,
    isUnpinError,
    isUnpining,
    isUnpinSuccess
  };
}
