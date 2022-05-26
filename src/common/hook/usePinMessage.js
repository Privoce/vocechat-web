import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  usePinMessageMutation,
  useUnpinMessageMutation,
} from "../../app/services/message";
export default function usePinMessage(cid = null) {
  const [pins, setPins] = useState([]);
  const { channel, loginUser } = useSelector((store) => {
    return {
      channel: store.channels.byId[cid],
      loginUser: store.contacts.byId[store.authData.uid],
    };
  });
  const [pin, { isError, isLoading, isSuccess }] = usePinMessageMutation();
  const [
    unpin,
    { isError: isUnpinError, isLoading: isUnpining, isSuccess: isUnpinSuccess },
  ] = useUnpinMessageMutation();
  const pinMessage = (mid) => {
    if (!mid || !cid) return;
    pin({ mid, gid: +cid });
  };
  const unpinMessage = (mid) => {
    if (!mid || !cid) return;
    unpin({ mid, gid: +cid });
  };
  const getPinInfo = (mid) => {
    const pins = channel?.pinned_messages;
    if (pins?.length == 0) return;
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
    canPin: loginUser.is_admin || channel?.owner == loginUser.uid,
    pinMessage,
    unpinMessage,
    isError,
    isPining: isLoading,
    isSuccess,
    isUnpinError,
    isUnpining,
    isUnpinSuccess,
  };
}
