import { useEffect } from "react";
import { useDispatch, batch } from "react-redux";
import { resetAuthData } from "../../app/slices/auth.data";
import { resetFootprint } from "../../app/slices/footprint";
import { resetChannels } from "../../app/slices/channels";
import { resetContacts } from "../../app/slices/contacts";
import { resetChannelMsg } from "../../app/slices/message.channel";
import { resetUserMsg } from "../../app/slices/message.user";
import { resetReactionMessage } from "../../app/slices/message.reaction";
import { resetMessage } from "../../app/slices/message";
import { useLazyLogoutQuery } from "../../app/services/auth";
export default function useLogout() {
  const dispatch = useDispatch();
  const [logout, { isLoading, isSuccess }] = useLazyLogoutQuery();
  const clearLocalData = () => {
    batch(() => {
      dispatch(resetFootprint());
      dispatch(resetChannelMsg());
      dispatch(resetUserMsg());
      dispatch(resetChannels());
      dispatch(resetContacts());
      dispatch(resetMessage());
      dispatch(resetReactionMessage());
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetAuthData());
    }
  }, [isSuccess]);

  return { clearLocalData, logout, exited: isSuccess, exiting: isLoading };
}
