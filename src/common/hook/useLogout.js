import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../../app/slices/auth.data";
import { clearMark } from "../../app/slices/visit.mark";
import { clearChannels } from "../../app/slices/channels";
import { clearContacts } from "../../app/slices/contacts";
import { clearChannelMsg } from "../../app/slices/message.channel";
import { clearUserMsg } from "../../app/slices/message.user";
import { clearPendingMsg } from "../../app/slices/message.pending";
import { useLazyLogoutQuery } from "../../app/services/auth";
export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading, isSuccess }] = useLazyLogoutQuery();
  const clearLocalData = () => {
    dispatch(clearMark());
    dispatch(clearChannelMsg());
    dispatch(clearUserMsg());
    dispatch(clearChannels());
    dispatch(clearContacts());
    dispatch(clearPendingMsg());
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearAuthData());
      navigate("/login");
    }
  }, [isSuccess]);

  return { clearLocalData, logout, exited: isSuccess, exiting: isLoading };
}
