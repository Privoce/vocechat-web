import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import initCache, { useRehydrate } from "../../app/cache";
import { useLazyGetContactsQuery } from "../../app/services/contact";
// import { useLazyInitStreamingQuery } from "../../app/services/streaming";

// import { useGetChannelsQuery } from "../../app/services/channel";
import { useLazyGetServerQuery } from "../../app/services/server";
import useStreaming from "../../common/hook/useStreaming";
// pollingInterval: 0,
// const querySetting = {
//   refetchOnMountOrArgChange: true,
// };
let request = null;
export default function usePreload() {
  const { rehydrate, rehydrated } = useRehydrate();
  // const [initStreaming, { isLoading: streaming }] = useLazyInitStreamingQuery();
  // const navigate = useNavigate();
  const store = useSelector((store) => store);
  const { startStreaming, streaming, initializing } = useStreaming();
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
      if (request) {
        request.abort();
      }
    };
  }, []);

  useEffect(() => {
    // rehydrate();
    if (rehydrated) {
      getContacts();
      getServer();
    }
  }, [rehydrated]);
  const canStreaming =
    contactsSuccess && rehydrated && !initializing && !streaming;
  useEffect(() => {
    if (canStreaming) {
      request = startStreaming(store);
    }
  }, [canStreaming]);

  // console.log("loading", contactsLoading, serverLoading, !checked);
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
