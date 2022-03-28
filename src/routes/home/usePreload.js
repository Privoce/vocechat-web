import { useEffect } from "react";
import { useSelector } from "react-redux";
import initCache, { useRehydrate } from "../../app/cache";
import { useLazyGetContactsQuery } from "../../app/services/contact";
import { useLazyGetServerQuery } from "../../app/services/server";
import useStreaming from "../../common/hook/useStreaming";
// pollingInterval: 0,
// const querySetting = {
//   refetchOnMountOrArgChange: true,
// };
// let request = null;
export default function usePreload() {
  const { rehydrate, rehydrated } = useRehydrate();
  const loginUid = useSelector((store) => store.authData.uid);
  const { setStreamingReady } = useStreaming();
  const [
    getContacts,
    {
      isLoading: contactsLoading,
      isSuccess: contactsSuccess,
      isError: contactsError,
      data: contacts,
    },
  ] = useLazyGetContactsQuery();
  const [
    getServer,
    {
      isLoading: serverLoading,
      isSuccess: serverSuccess,
      isError: serverError,
      data: server,
    },
  ] = useLazyGetServerQuery();
  useEffect(() => {
    initCache();
    rehydrate();
    return () => {
      setStreamingReady(false);
    };
  }, []);

  useEffect(() => {
    if (rehydrated) {
      getContacts();
      getServer();
    }
  }, [rehydrated]);
  const canStreaming = loginUid && rehydrated;
  useEffect(() => {
    if (canStreaming) {
      setStreamingReady(true);
    }
  }, [canStreaming]);

  return {
    loading: contactsLoading || serverLoading || !rehydrated,
    error: contactsError && serverError,
    success: contactsSuccess && serverSuccess,
    data: {
      contacts,
      server,
    },
  };
}
