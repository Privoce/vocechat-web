import { useState } from "react";
// import { useUpdateChannelMutation } from "../../app/services/channel";
import { useUpdateMuteSettingMutation } from "../../app/services/user";
import { useReadMessageMutation } from "../../app/services/message";
import { useAppSelector } from "../../app/store";

export default function useSession({ type, id }) {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [muteChannel] = useUpdateMuteSettingMutation();
  const [updateReadIndex] = useReadMessageMutation();
  const { messageData, userData, channelData } = useAppSelector((store) => {
    return {
      messageData: store.message,
      userData: store.users.byId,
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
