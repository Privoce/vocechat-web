import { useEffect } from "react";
import { useSelector } from "react-redux";
import initCache, { useRehydrate } from "../../app/cache";
import { useLazyGetFavoritesQuery } from "../../app/services/message";
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
  const { loginUid, token } = useSelector((store) => {
    return { loginUid: store.authData.uid, token: store.authData.token };
  });
  const { setStreamingReady } = useStreaming();
  const [
    getFavorites,
    {
      isLoading: favoritesLoading,
      isSuccess: favoritesSuccess,
      isError: favoritesError,
      data: favorites
    }
  ] = useLazyGetFavoritesQuery();
  const [
    getContacts,
    {
      isLoading: contactsLoading,
      isSuccess: contactsSuccess,
      isError: contactsError,
      data: contacts
    }
  ] = useLazyGetContactsQuery();
  const [
    getServer,
    { isLoading: serverLoading, isSuccess: serverSuccess, isError: serverError, data: server }
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
      getFavorites();
    }
  }, [rehydrated]);
  const canStreaming = loginUid && rehydrated && !!token;
  useEffect(() => {
    setStreamingReady(canStreaming);
  }, [canStreaming]);

  return {
    loading: contactsLoading || serverLoading || favoritesLoading || !rehydrated,
    error: contactsError && serverError && favoritesError,
    success: contactsSuccess && serverSuccess && favoritesSuccess,
    data: {
      contacts,
      server,
      favorites
    }
  };
}
