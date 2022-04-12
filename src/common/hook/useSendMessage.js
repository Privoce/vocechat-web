// import second from 'first'
import { useSendChannelMsgMutation } from "../../app/services/channel";
import { useSendMsgMutation } from "../../app/services/contact";
export default function useSendMessage({
  context = "user",
  from = null,
  to = null,
}) {
  const [
    sendChannelMsg,
    {
      isLoading: channelSending,
      isSuccess: channelSuccess,
      isError: channelError,
    },
  ] = useSendChannelMsgMutation();
  const [
    sendUserMsg,
    { isLoading: userSending, isSuccess: userSuccess, isError: userError },
  ] = useSendMsgMutation();
  const sendFn = context == "user" ? sendUserMsg : sendChannelMsg;
  const sendMessage = ({ type = "text", content, properties = {} }) => {
    sendFn({
      id: to,
      content,
      properties: { ...properties, local_id: new Date().getTime() },
      type,
      from_uid: from,
    });
  };
  return {
    sendMessage,
    isError: channelError || userError,
    isSending: userSending || channelSending,
    isSuccess: channelSuccess || userSuccess,
  };
}
