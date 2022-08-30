import { useEffect } from "react";
import dayjs from "dayjs";
import initCache, { useRehydrate } from "../../app/cache";
import { useLazyGetFavoritesQuery } from "../../app/services/message";
import { useLazyGetUsersQuery } from "../../app/services/user";
import { useLazyGetServerQuery } from "../../app/services/server";
import useStreaming from "./useStreaming";
import { useAppSelector } from "../../app/store";
import { useLazyGetHistoryMessagesQuery } from "../../app/services/channel";
// type Props={
//   guest?:boolean
// }
let preloadChannelMsgs = false;
export default function usePreload() {
  const [preloadChannelMessages] = useLazyGetHistoryMessagesQuery();
  const { rehydrate, rehydrated } = useRehydrate();
  const {
    loginUid,
    token,
    expireTime = +new Date(),
    channelMessageData,
    channelIds
  } = useAppSelector((store) => {
    return {
      channelIds: store.channels.ids,
      channelMessageData: store.channelMessage,
      loginUid: store.authData.user?.uid,
      token: store.authData.token,
      expireTime: store.authData.expireTime
    };
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
    if (channelIds.length > 0 && !preloadChannelMsgs) {
      const tmps = channelIds.filter((cid) => !channelMessageData[cid]);
      console.log("tmpss", tmps);
      tmps.forEach((id) => {
        preloadChannelMessages({ id, limit: 50 });
      });
      preloadChannelMsgs = true;
    }
  }, [channelIds, channelMessageData]);
  useEffect(() => {
    if (rehydrated) {
      getUsers();
      getServer();
      getFavorites();
    }
  }, [rehydrated]);
  const tokenAlmostExpire = dayjs().isAfter(new Date(expireTime - 20 * 1000));
  const canStreaming = !!loginUid && rehydrated && !!token && !tokenAlmostExpire;
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
