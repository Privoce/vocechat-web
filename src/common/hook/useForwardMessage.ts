import { useState } from "react";
import { useSendChannelMsgMutation } from "../../app/services/channel";
import { useSendMsgMutation } from "../../app/services/contact";
import { useCreateArchiveMutation } from "../../app/services/message";

export default function useForwardMessage() {
  const [forwarding, setForwarding] = useState(false);
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
  const forwardMessage = async ({ mids = [], users = [], channels = [] }) => {
    setForwarding(true);
    const { data: archive_id } = await createArchive(mids);
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
    forwarding,
    isError: channelError || userError || createArchiveError,
    isSending: userSending || channelSending || creatingArchive,
    isSuccess: channelSuccess || userSuccess || createArchiveSuccess
  };
}
