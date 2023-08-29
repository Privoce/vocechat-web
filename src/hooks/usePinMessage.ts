import { useEffect, useState } from "react";

import { usePinMessageMutation, useUnpinMessageMutation } from "@/app/services/message";
import { useAppSelector } from "@/app/store";
import { PinnedMessage } from "@/types/channel";
import { shallowEqual } from "react-redux";

export default function usePinMessage(cid: number) {
  const [pins, setPins] = useState<PinnedMessage[]>([]);
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const channel = useAppSelector((store) => store.channels.byId[cid], shallowEqual);
  const [pin, { isError, isLoading, isSuccess }] = usePinMessageMutation();
  const [unpin, { isError: isUnpinError, isLoading: isUnpinning, isSuccess: isUnpinSuccess }] =
    useUnpinMessageMutation();
  const pinMessage = (mid: number) => {
    if (!mid) return;
    pin({ mid, gid: +cid });
  };
  const unpinMessage = (mid: number) => {
    if (!mid) return;
    unpin({ mid, gid: +cid });
  };
  const getPinInfo = (mid: number) => {
    if (!channel) return;
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
    isUnpinning,
    isUnpinSuccess
  };
}
