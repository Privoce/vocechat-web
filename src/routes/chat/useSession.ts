import { useState } from "react";
// import { useUpdateChannelMutation } from "../../app/services/channel";
import { useUpdateMuteSettingMutation } from "../../app/services/contact";
import { useReadMessageMutation } from "../../app/services/message";
import { useAppSelector } from "../../app/store";

export default function useSession({ type, id }) {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [muteChannel] = useUpdateMuteSettingMutation();
  const [updateReadIndex] = useReadMessageMutation();
  const { messageData, contactData, channelData } = useAppSelector((store) => {
    return {
      messageData: store.message,
      contactData: store.contacts.byId,
      channelData: store.channels.byId
    };
  });
  const toggleInviteModal = () => {
    setInviteModalVisible((prev) => !prev);
  };
  return {
    inviteModalVisible,
    toggleInviteModal
  };
}
