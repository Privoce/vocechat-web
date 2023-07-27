import { useEffect } from "react";
import dayjs from "dayjs";
import initCache, { useRehydrate } from "@/app/cache";
import { useLazyGetFavoritesQuery, useLazyLoadMoreMessagesQuery } from "@/app/services/message";
import { useLazyGetServerVersionQuery, useLazyGetSystemCommonQuery } from "@/app/services/server";
import { useLazyGetContactsQuery, useLazyGetUsersQuery } from "@/app/services/user";
import { useAppSelector } from "@/app/store";
import useLicense from "./useLicense";
import useStreaming from "./useStreaming";

let preloadChannelMsgs = false;
export default function usePreload() {
  const { isLoading: loadingLicense } = useLicense(false);
  const [preloadChannelMessages] = useLazyLoadMoreMessagesQuery();
  const { rehydrate, rehydrated } = useRehydrate();
  const {
    ready,
    loginUid,
    token,
    isGuest,
    expireTime = +new Date(),
    channelMessageData,
    channelIds,
    enableContacts
  } = useAppSelector((store) => {
    return {
      ready: store.ui.ready,
      channelIds: store.channels.ids,
      channelMessageData: store.channelMessage,
      loginUid: store.authData.user?.uid,
      isGuest: store.authData.guest,
      token: store.authData.token,
      expireTime: store.authData.expireTime,
      enableContacts: store.server.contact_verification_enable
    };
  });
  const { startStreaming } = useStreaming();
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
    getContacts,
    {
      isLoading: contactsLoading,
      isSuccess: contactsSuccess,
      isError: contactsError,
      data: contacts
    }
  ] = useLazyGetContactsQuery();

  const [
    getServerVersion,
    { data: serverVersion, isSuccess: serverVersionSuccess, isLoading: loadingServerVersion }
  ] = useLazyGetServerVersionQuery();
  const [getSystemCommon] = useLazyGetSystemCommonQuery();
  useEffect(() => {
    initCache();
    rehydrate();
    getServerVersion();
    // return ()=>{
    //   stopStreaming()
    // }
  }, []);
  // 在guest的时候 预取channel数据
  useEffect(() => {
    if (isGuest && channelIds.length > 0 && !preloadChannelMsgs) {
      const tmps = channelIds.filter((cid) => !channelMessageData[cid]);
      tmps.forEach((id) => {
        if (id) {
          preloadChannelMessages({ id, limit: 50 });
        }
      });
      preloadChannelMsgs = true;
    }
  }, [channelIds, channelMessageData, isGuest]);
  useEffect(() => {
    if (rehydrated && serverVersion) {
      getUsers().then(() => {
        if (!isGuest) {
          getContacts();
        }
      });
      getFavorites();
      getSystemCommon();
    }
  }, [rehydrated, serverVersion, isGuest]);
  const tokenAlmostExpire = dayjs().isAfter(new Date(expireTime - 20 * 1000));
  const canStreaming = !!loginUid && rehydrated && !!token && !tokenAlmostExpire && !ready;

  useEffect(() => {
    console.log("tttt", canStreaming);
    if (canStreaming) {
      startStreaming();
    }
  }, [canStreaming]);
  return {
    loading:
      usersLoading || favoritesLoading || !rehydrated || loadingLicense || loadingServerVersion,
    error: usersError && favoritesError,
    success: usersSuccess && favoritesSuccess && serverVersionSuccess,
    data: {
      users: enableContacts ? contacts : users,
      favorites
    }
  };
}
