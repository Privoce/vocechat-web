import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import initCache, { useRehydrate } from "../../app/cache";
import { useLazyGetContactsQuery } from "../../app/services/contact";
import { clearAuthData, setUserData } from "../../app/slices/auth.data";
import { setContacts } from "../../app/slices/contacts";

// import { useGetChannelsQuery } from "../../app/services/channel";
import {
  useLazyGetServerQuery,
  useLazyGetMetricsQuery,
} from "../../app/services/server";
import { KEY_UID } from "../../app/config";
// pollingInterval: 0,
// const querySetting = {
//   refetchOnMountOrArgChange: true,
// };
export default function usePreload() {
  const { rehydrate, cacheFirst } = useRehydrate();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [
    getMetrics,
    {
      isLoading: metricsLoading,
      isSuccess: metricsSuccess,
      isError: metricsError,
      data: metrics,
    },
  ] = useLazyGetMetricsQuery();
  useEffect(() => {
    initCache();
    rehydrate();
  }, []);
  useEffect(() => {
    getContacts();
    getServer();
    getMetrics();
  }, []);

  useEffect(() => {
    const local_uid = localStorage.getItem(KEY_UID);
    if (contacts) {
      const matchedUser = contacts.find((c) => c.uid == local_uid);
      if (!matchedUser) {
        console.log("no matched user, redirect to login");
        dispatch(clearAuthData());
        navigate("/login");
      } else {
        const markedContacts = contacts.map((u) => {
          return u.uid == matchedUser.uid ? { ...u, online: true } : u;
        });
        dispatch(setUserData(matchedUser));
        dispatch(setContacts(markedContacts));
        setChecked(true);
      }
    }
  }, [contacts]);
  return {
    loading:
      contactsLoading ||
      serverLoading ||
      metricsLoading ||
      !checked ||
      !cacheFirst,
    error: contactsError && serverError && metricsError,
    success: contactsSuccess && serverSuccess && metricsSuccess,
    data: {
      contacts,
      server,
      metrics,
    },
  };
}
