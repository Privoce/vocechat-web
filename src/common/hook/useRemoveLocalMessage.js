// import second from 'first'
import { useDispatch } from "react-redux";
import { removeMessage } from "../../app/slices/message";
import { removeChannelMsg } from "../../app/slices/message.channel";
import { removeUserMsg } from "../../app/slices/message.user";
export default function useRemoveLocalMessage({ context = "user", id = 0 }) {
  const dispatch = useDispatch();
  const removeContextMessage = context == "channel" ? removeChannelMsg : removeUserMsg;
  const removeLocalMessage = (mid) => {
    dispatch(removeContextMessage({ id, mid }));
    dispatch(removeMessage(mid));
  };
  return removeLocalMessage;
}
