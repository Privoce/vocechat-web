import { useEffect } from "react";
import initCache, { useRehydrate } from "../../app/cache";
import { useLazyGetFavoritesQuery } from "../../app/services/message";
import { useLazyGetUsersQuery } from "../../app/services/user";
import { useLazyGetServerQuery } from "../../app/services/server";
import useStreaming from "../../common/hook/useStreaming";
import { useAppSelector } from "../../app/store";
export default function usePreload() {
  const { rehydrate, rehydrated } = useRehydrate();
  const { loginUid, token } = useAppSelector((store) => {
    return { loginUid: store.authData.user?.uid, token: store.authData.token };
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
    getUsers,
    { isLoading: usersLoading, isSuccess: usersSuccess, isError: usersError, data: users }
  ] = useLazyGetUsersQuery();
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
      getUsers();
      getServer();
      getFavorites();
    }
  }, [rehydrated]);
  const canStreaming = !!loginUid && rehydrated && !!token;
  console.log("ttt", loginUid, rehydrated, token);

  useEffect(() => {
    setStreamingReady(canStreaming);
  }, [canStreaming]);

  return {
    loading: usersLoading || serverLoading || favoritesLoading || !rehydrated,
    error: usersError && serverError && favoritesError,
    success: usersSuccess && serverSuccess && favoritesSuccess,
    data: {
      users,
      server,
      favorites
    }
  };
}
