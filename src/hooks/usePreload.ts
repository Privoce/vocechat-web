import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import initCache, { useRehydrate } from "@/app/cache";
import { PUBLIC_BOT_MIN_VERSION } from "@/app/config";
import { useLazyGetFavoritesQuery, useLazyLoadMoreMessagesQuery } from "@/app/services/message";
import { useLazyGetServerVersionQuery, useLazyGetSystemCommonQuery } from "@/app/services/server";
import { useLazyGetContactsQuery, useLazyGetUsersQuery } from "@/app/services/user";
import { useAppSelector } from "@/app/store";
import { compareVersion } from "@/utils";
import useLicense from "./useLicense";
import useStreaming from "./useStreaming";
import { shallowEqual } from "react-redux";

let preloadChannelMsgs = false;
let preloadBotMsgs = false;
export default function usePreload() {
  const { isLoading: loadingLicense } = useLicense(false);
  const [preloadChannelMessages] = useLazyLoadMoreMessagesQuery();
  const { rehydrate, rehydrated } = useRehydrate();
  const ready = useAppSelector((store) => store.ui.ready, shallowEqual);
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const enableContacts = useAppSelector(
    (store) => store.server.contact_verification_enable,
    shallowEqual
  );
  const expireTime = useAppSelector(
    (store) => store.authData.expireTime ?? +new Date(),
    shallowEqual
  );
  const channelIds = useAppSelector((store) => store.channels.ids, shallowEqual);
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const supportsPublicBot = useMemo(
    () => !!currentVersion && compareVersion(currentVersion, PUBLIC_BOT_MIN_VERSION) >= 0,
    [currentVersion]
  );
  const publicBotIds = useAppSelector(
    (store) =>
      supportsPublicBot
        ? Object.values(store.users.byId)
            .filter((u) => !!u.is_bot && !!u.is_public)
            .map((u) => u.uid)
        : [],
    shallowEqual
  );
  const token = useAppSelector((store) => store.authData.token, shallowEqual);
  const isGuest = useAppSelector((store) => store.authData.guest, shallowEqual);
  const channelMessageData = useAppSelector((store) => store.channelMessage, shallowEqual);
  const { startStreaming, stopStreaming } = useStreaming();
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
  const [getContacts, { data: contacts }] = useLazyGetContactsQuery();

  const [
    getServerVersion,
    {
      data: serverVersion,
      isSuccess: serverVersionSuccess,
      isLoading: loadingServerVersion,
      isError: serverVersionError
    }
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
  // 在 guest 的时候 预取 channel 数据
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
  // 在 guest 的时候 预取公开 bot 的私聊历史
  useEffect(() => {
    if (isGuest && publicBotIds.length > 0 && !preloadBotMsgs) {
      publicBotIds.forEach((id) => {
        if (id) {
          preloadChannelMessages({ context: "dm", id, limit: 50 });
        }
      });
      preloadBotMsgs = true;
    }
  }, [publicBotIds, isGuest]);
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

  console.log("tttt", canStreaming, { loginUid, rehydrated, token, tokenAlmostExpire, ready });
  useEffect(() => {
    if (canStreaming) {
      // 先停掉，再连接
      stopStreaming();
      setTimeout(() => {
        startStreaming();
      }, 100);
    }
  }, [canStreaming]);
  return {
    loading:
      usersLoading || favoritesLoading || !rehydrated || loadingLicense || loadingServerVersion,
    error: usersError || favoritesError || serverVersionError,
    success: usersSuccess && favoritesSuccess && serverVersionSuccess,
    data: {
      users: enableContacts ? contacts : users,
      favorites
    }
  };
}
