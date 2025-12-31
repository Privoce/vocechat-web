import { useState } from "react";

import { useSendChannelMsgMutation } from "@/app/services/channel";
import { useCreateArchiveMutation } from "@/app/services/message";
import { useSendMsgMutation } from "@/app/services/user";
import { useAppSelector } from "@/app/store";
import { ContentTypes } from "@/app/config";
import { shallowEqual } from "react-redux";

export default function useForwardMessage() {
  const [forwarding, setForwarding] = useState(false);
  const messages = useAppSelector((store) => store.message, shallowEqual);
  const [
    createArchive,
    { isError: createArchiveError, isLoading: creatingArchive, isSuccess: createArchiveSuccess }
  ] = useCreateArchiveMutation();
  const [
    sendChannelMsg,
    { isLoading: channelSending, isSuccess: channelSuccess, isError: channelError }
  ] = useSendChannelMsgMutation();
  const [sendUserMsg, { isLoading: userSending, isSuccess: userSuccess, isError: userError }] =
    useSendMsgMutation();
  
  const forwardMessageOneByOne = async ({
    mids,
    users,
    channels
  }: {
    mids: number[];
    users: number[];
    channels: number[];
  }) => {
    setForwarding(true);
    
    for (const mid of mids) {
      const message = messages[mid];
      if (!message) continue;
      
      const { content_type, content, properties, file_path } = message;
      let forwardContent = content;
      let forwardType: "text" | "markdown" | "file" | "audio" = "text";
      let forwardProperties = properties;
      
      // 处理不同类型的消息
      if (content_type === ContentTypes.text) {
        forwardType = "text";
        forwardContent = content;
      } else if (content_type === ContentTypes.markdown) {
        forwardType = "markdown";
        forwardContent = content;
      } else if (content_type === ContentTypes.file) {
        forwardType = "file";
        forwardContent = { path: file_path || (typeof content === "string" ? content : content.path) };
        forwardProperties = properties;
      } else if (content_type === ContentTypes.audio) {
        forwardType = "audio";
        forwardContent = { path: file_path || (typeof content === "string" ? content : content.path) };
        forwardProperties = properties;
      }
      
      // 发送给用户
      if (users.length) {
        for (const uid of users) {
          await sendUserMsg({
            type: forwardType,
            id: uid,
            content: forwardContent,
            properties: forwardProperties
          });
        }
      }
      
      // 发送给频道
      if (channels.length) {
        for (const cid of channels) {
          await sendChannelMsg({
            type: forwardType,
            id: cid,
            content: forwardContent,
            properties: forwardProperties
          });
        }
      }
    }
    
    setForwarding(false);
  };
  
  const forwardMessage = async ({
    mids,
    users,
    channels
  }: {
    mids: number[];
    users: number[];
    channels: number[];
  }) => {
    setForwarding(true);
    const resp = await createArchive(mids);
    if ("error" in resp) {
      return;
    }
    const archive_id = resp.data;
    if (users.length) {
      for await (const uid of users) {
        await sendUserMsg({
          type: "archive",
          id: uid,
          content: archive_id
          // from_uid: from,
        });
      }
    }
    if (channels.length) {
      for await (const cid of channels) {
        await sendChannelMsg({
          type: "archive",
          id: cid,
          content: archive_id
          // from_uid: from,
        });
      }
    }
    setForwarding(false);
  };
  return {
    forwardMessage,
    forwardMessageOneByOne,
    forwarding,
    isError: channelError || userError || createArchiveError,
    isSending: userSending || channelSending || creatingArchive,
    isSuccess: channelSuccess || userSuccess || createArchiveSuccess
  };
}
