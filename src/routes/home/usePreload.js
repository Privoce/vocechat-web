import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import initCache, { useRehydrate } from "../../app/cache";
import { useLazyGetContactsQuery } from "../../app/services/contact";
// import { useLazyInitStreamingQuery } from "../../app/services/streaming";
import { resetAuthData, setUid } from "../../app/slices/auth.data";
import { fullfillContacts } from "../../app/slices/contacts";

// import { useGetChannelsQuery } from "../../app/services/channel";
import { useLazyGetServerQuery } from "../../app/services/server";
import useStreaming from "../../common/hook/useStreaming";
import { KEY_UID } from "../../app/config";
// pollingInterval: 0,
// const querySetting = {
//   refetchOnMountOrArgChange: true,
// };
let request = null;
export default function usePreload() {
  const { rehydrate, rehydrated } = useRehydrate();
  // const [initStreaming, { isLoading: streaming }] = useLazyInitStreamingQuery();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  useEffect(() => {
    if (checked && rehydrated && !initializing && !streaming) {
      request = startStreaming(store);
    }
  }, [checked, rehydrated, store, streaming, initializing]);

  useEffect(() => {
    const local_uid = localStorage.getItem(KEY_UID);
    if (contacts) {
      const matchedUser = contacts.find((c) => c.uid == local_uid);
      console.log("wtf", contacts, matchedUser);
      if (!matchedUser) {
        // 用户已注销或被禁用
        console.log("no matched user, redirect to login");
        dispatch(resetAuthData());
        navigate("/login");
      } else {
        const markedContacts = contacts.map((u) => {
          return u.uid == matchedUser.uid ? { ...u, online: true } : u;
        });
        dispatch(setUid(matchedUser.uid));
        dispatch(fullfillContacts(markedContacts));
        setChecked(true);
      }
    }
  }, [contacts]);
  // console.log("loading", contactsLoading, serverLoading, !checked);
  return {
    loading: contactsLoading || serverLoading || !checked || !rehydrated,
    error: contactsError && serverError,
    success: contactsSuccess && serverSuccess,
    data: {
      contacts,
      server,
    },
  };
}
