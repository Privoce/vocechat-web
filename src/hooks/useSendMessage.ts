import toast from "react-hot-toast";
import { removeReplyingMessage, addReplyingMessage, MessagePayload } from "@/app/slices/message";
import { useSendChannelMsgMutation } from "@/app/services/channel";
import { useSendMsgMutation } from "@/app/services/user";
import { useReplyMessageMutation } from "@/app/services/message";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ContentTypeKey } from "@/types/message";
import { ChatContext } from "@/types/common";

interface Props {
  context: ChatContext;
  from?: number;
  to: number;
}

interface SendMessagesDTO {
  type: "text";
  content: string | { path: string };
  users: number[];
  channels: number[];
}

type SendMessageDTO = { type: ContentTypeKey } & Partial<MessagePayload> & { ignoreLocal?: boolean }
const useSendMessage = (props?: Props) => {
  const { context = "dm", from = 0, to = 0 } = props || {};
  const dispatch = useAppDispatch();
  const stageFiles = useAppSelector((store) => store.ui.uploadFiles[`${context}_${to}`] || []);
  const [replyMessage, { isError: replyErr, isLoading: replying, isSuccess: replySuccess }] =
    useReplyMessageMutation();
  const [
    sendChannelMsg,
    { isLoading: channelSending, isSuccess: channelSuccess, isError: channelError }
  ] = useSendChannelMsgMutation();
  const [sendUserMsg, { isLoading: userSending, isSuccess: userSuccess, isError: userError }] =
    useSendMsgMutation();
  const sendFn = context == "dm" ? sendUserMsg : sendChannelMsg;
  const sendMessages = async ({
    type = "text",
    content,
    users = [],
    channels = []
  }: SendMessagesDTO) => {
    if (users.length) {
      for await (const uid of users) {
        await sendUserMsg({
          type,
          id: uid,
          content
        });
      }
    }
    if (channels.length) {
      for await (const cid of channels) {
        await sendChannelMsg({
          type,
          id: cid,
          content
        });
      }
    }
  };
  const sendMessage = async ({
    type = "text",
    content = "",
    properties,
    reply_mid,
    ...rest
  }: SendMessageDTO) => {
    if (reply_mid) {
      removeReplying();
      await replyMessage({
        from_uid: from,
        reply_mid,
        type,
        content,
        properties
      });
    } else {
      await sendFn({
        id: to,
        content,
        properties,
        type,
        from_uid: from,
        ...rest
      });
    }
  };
  const setReplying = (mid: number) => {
    if (stageFiles.length !== 0) {
      toast.error("Only text is supported when replying a message");
      return;
    }
    dispatch(addReplyingMessage({ mid, key: `${context}_${to}` }));
  };
  const removeReplying = () => {
    dispatch(removeReplyingMessage(`${context}_${to}`));
  };
  return {
    setReplying,
    removeReplying,
    sendMessages,
    sendMessage,
    isError: channelError || userError || replyErr,
    isSending: userSending || channelSending || replying,
    isSuccess: channelSuccess || userSuccess || replySuccess
  };
};
export default useSendMessage;
