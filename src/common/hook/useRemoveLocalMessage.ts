import { removeMessage } from "../../app/slices/message";
import { removeChannelMsg } from "../../app/slices/message.channel";
import { removeUserMsg } from "../../app/slices/message.user";
import { useAppDispatch } from "../../app/store";

// todo: check usage
interface Props {
  context: "user" | "channel";
  id: number;
}

export default function useRemoveLocalMessage({ context = "user", id = 0 }: Props) {
  const dispatch = useAppDispatch();
  const removeContextMessage = context == "channel" ? removeChannelMsg : removeUserMsg;

  return (mid: number) => {
    dispatch(removeContextMessage({ id, mid }));
    dispatch(removeMessage(mid));
  };
}
