import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { resetFootprint } from "../../app/slices/footprint";
import { resetChannels } from "../../app/slices/channels";
import { resetUsers } from "../../app/slices/users";
import { resetChannelMsg } from "../../app/slices/message.channel";
import { resetUserMsg } from "../../app/slices/message.user";
import { resetReactionMessage } from "../../app/slices/message.reaction";
import { resetFileMessage } from "../../app/slices/message.file";
import { resetMessage } from "../../app/slices/message";
import { useLazyLogoutQuery } from "../../app/services/auth";
import { updateVoicingInfo } from '../../app/slices/voice';
export default function useLogout() {
  const dispatch = useDispatch();
  const [logout, { isLoading, isSuccess }] = useLazyLogoutQuery();
  const clearLocalData = () => {
    dispatch(resetFootprint());
    dispatch(resetChannelMsg());
    dispatch(resetUserMsg());
    dispatch(resetChannels());
    dispatch(resetUsers());
    dispatch(resetMessage());
    dispatch(resetReactionMessage());
    dispatch(resetFileMessage());
  };

  useEffect(() => {
    if (isSuccess) {
      // 清理当前voicing上下文
      if (window.VOICE_CLIENT) {
        window.VOICE_CLIENT.leave();
        dispatch(updateVoicingInfo(null));
      }
    }
  }, [isSuccess]);

  return { clearLocalData, logout, exited: isSuccess, exiting: isLoading };
}
