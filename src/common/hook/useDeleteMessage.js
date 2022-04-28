import { useState } from "react";
import { useSelector } from "react-redux";
import { useLazyDeleteMessageQuery } from "../../app/services/message";
export default function useDeleteMessage() {
  const [deleting, setDeleting] = useState(false);
  const { loginUser, messageData } = useSelector((store) => {
    return {
      messageData: store.message,
      loginUser: store.contacts.byId[store.authData.uid],
    };
  });
  const [
    remove,
    // { isError, isLoading, isSuccess },
  ] = useLazyDeleteMessageQuery();
  const deleteMessage = async (mids) => {
    if (!mids) return;
    const _arr = Array.isArray(mids) ? mids : [mids];
    setDeleting(true);
    for await (const mid of _arr) {
      await remove(mid);
    }
    setDeleting(false);
  };
  const canDelete = (mids = []) => {
    if (!mids || mids.length == 0) return false;
    // 管理员
    if (loginUser.is_admin) return true;
    // 检查是否是自己的消息
    return mids.every((mid) => {
      return messageData[mid]?.from_uid == loginUser.uid;
    });
  };
  // useEffect(() => {
  //   if (channel) {
  //     setPins(channel.pinned_messages);
  //   }
  // }, [channel]);

  return {
    canDelete,
    isDeleting: deleting,
    deleteMessage,
  };
}
