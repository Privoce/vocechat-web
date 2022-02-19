import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetContactsQuery } from "../../app/services/contact";
import { clearAuthData } from "../../app/slices/auth.data";
import { setContacts } from "../../app/slices/contacts";

// import { useGetChannelsQuery } from "../../app/services/channel";
import { useGetServerQuery } from "../../app/services/server";
// pollingInterval: 0,
const querySetting = {
  refetchOnMountOrArgChange: true,
};
export default function usePreload() {
  const [checked, setChecked] = useState(false);
  const loginedUser = useSelector((store) => {
    return store.authData.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading: contactsLoading,
    isSuccess: contactsSuccess,
    isError: contactsError,
    data: contacts,
  } = useGetContactsQuery(undefined, querySetting);
  const {
    isLoading: serverLoading,
    isSuccess: serverSuccess,
    isError: serverError,
    data: server,
  } = useGetServerQuery(undefined, querySetting);
  // const {
  //   isLoading: groupsLoading,
  //   isSuccess: groupsSuccess,
  //   isError: groupsError,
  //   data: groups,
  // } = useGetChannelsQuery(undefined, querySetting);
  useEffect(() => {
    if (contacts) {
      const matchedUser = contacts.find((c) => c.uid == loginedUser.uid);
      if (!matchedUser) {
        dispatch(clearAuthData());
        navigate("/login");
      } else {
        const markedContacts = contacts.map((u) => {
          return u.uid == matchedUser.uid ? { ...u, online: true } : u;
        });
        dispatch(setContacts(markedContacts));
        setChecked(true);
      }
    }
  }, [contacts]);

  return {
    loading: contactsLoading || serverLoading || !checked,
    error: contactsError && serverError,
    success: contactsSuccess && serverSuccess,
    data: {
      contacts,
      server,
    },
  };
}
