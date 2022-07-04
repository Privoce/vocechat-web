import { useDispatch, batch } from "react-redux";
import { resetFootprint } from "../../app/slices/footprint";
import { resetChannels } from "../../app/slices/channels";
import { resetContacts } from "../../app/slices/users";
import { resetChannelMsg } from "../../app/slices/message.channel";
import { resetUserMsg } from "../../app/slices/message.user";
import { resetReactionMessage } from "../../app/slices/message.reaction";
import { resetFileMessage } from "../../app/slices/message.file";
import { resetMessage } from "../../app/slices/message";
import { useLazyLogoutQuery } from "../../app/services/auth";
export default function useLogout() {
  const dispatch = useDispatch();
  const [logout, { isLoading, isSuccess }] = useLazyLogoutQuery();
  // todo: remove batch
  // If you're using React 18, you do not need to use the batch API. React 18 automatically
  // batches all state updates, no matter where they're queued.
  // ref: https://react-redux.js.org/api/batch
  const clearLocalData = () => {
    batch(() => {
      dispatch(resetFootprint());
      dispatch(resetChannelMsg());
      dispatch(resetUserMsg());
      dispatch(resetChannels());
      dispatch(resetContacts());
      dispatch(resetMessage());
      dispatch(resetReactionMessage());
      dispatch(resetFileMessage());
    });
  };

  return { clearLocalData, logout, exited: isSuccess, exiting: isLoading };
}
