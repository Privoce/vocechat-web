// import second from 'first'
import { removeReplyingMessage, addReplyingMessage } from "../../app/slices/message";
import { useSendChannelMsgMutation } from "../../app/services/channel";
import { useSendMsgMutation } from "../../app/services/contact";
import { useReplyMessageMutation } from "../../app/services/message";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
export default function useSendMessage(props) {
  const { context = "user", from = null, to = null } = props || {};
  const dispatch = useDispatch();
  const stageFiles = useSelector((store) => store.ui.uploadFiles[`${context}_${to}`] || []);
  const [replyMessage, { isError: replyErr, isLoading: replying, isSuccess: replySuccess }] =
    useReplyMessageMutation();
  const [
    sendChannelMsg,
    { isLoading: channelSending, isSuccess: channelSuccess, isError: channelError }
  ] = useSendChannelMsgMutation();
  const [sendUserMsg, { isLoading: userSending, isSuccess: userSuccess, isError: userError }] =
    useSendMsgMutation();
  const sendFn = context == "user" ? sendUserMsg : sendChannelMsg;
  const sendMessages = async ({ type = "text", content, users = [], channels = [] }) => {
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
    content,
    properties = {},
    reply_mid = null,
    ...rest
  }) => {
    if (reply_mid) {
      removeReplying();
      await replyMessage({
        id: to,
        reply_mid,
        type,
        content,
        context,
        from_uid: from
      });
    } else {
      await sendFn({
        id: to,
        content,
        properties: { ...properties },
        type,
        from_uid: from,
        ...rest
      });
    }
  };
  const setReplying = (mid) => {
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
}
