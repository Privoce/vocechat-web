// import React from 'react';
import { useGetContactsQuery } from "../../app/services/contact";
// import { useGetChannelsQuery } from "../../app/services/channel";
import { useGetServerQuery } from "../../app/services/server";
// pollingInterval: 0,
const querySetting = {
  refetchOnMountOrArgChange: true,
};
export default function usePreload() {
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

  return {
    loading: contactsLoading && serverLoading,
    error: contactsError && serverError,
    success: contactsSuccess && serverSuccess,
    data: {
      contacts,
      server,
    },
  };
}
