// import second from 'first'
import { useSendChannelMsgMutation } from "../../app/services/channel";
import { useSendMsgMutation } from "../../app/services/contact";
export default function useSendImageMessage({
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
  const uploadFn = context == "user" ? sendUserMsg : sendChannelMsg;
  const sendImageMessage = (file) => {
    if (!file) return;
    const { name, size, type } = file;
    uploadFn({
      id: to,
      content: file,
      properties: { name, size, type, local_id: new Date().getTime() },
      type: "image",
      from_uid: from,
    });
  };
  return {
    sendImageMessage,
    isError: channelError || userError,
    isSending: userSending || channelSending,
    isSuccess: channelSuccess || userSuccess,
  };
}
