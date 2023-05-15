import { useState } from "react";
import { useLazyDeleteMessageQuery } from "@/app/services/message";
import { useAppSelector } from "@/app/store";

export default function useDeleteMessage() {
  const [deleting, setDeleting] = useState(false);
  const { loginUser, messageData } = useAppSelector((store) => {
    return {
      messageData: store.message,
      loginUser: store.authData.user
    };
  });
  const [
    remove
    // { isError, isLoading, isSuccess },
  ] = useLazyDeleteMessageQuery();
  const deleteMessage = async (mids: number[]) => {
    if (!mids) return;
    const _arr = Array.isArray(mids) ? mids : [mids];
    setDeleting(true);
    for await (const mid of _arr) {
      await remove(mid);
    }
    setDeleting(false);
  };
  const canDelete = (mids?: number[]) => {
    if (!mids || mids.length == 0) return false;
    // 管理员
    if (loginUser?.is_admin) return true;
    // 检查是否是自己的消息
    return mids.every((mid) => {
      return messageData[mid]?.from_uid == loginUser?.uid;
    });
  };
  return {
    canDelete,
    isDeleting: deleting,
    deleteMessage
  };
}
