import { useEffect, useState } from "react";
import { escapeRegExp } from "lodash";

import { StoredUser } from "@/app/slices/users";
import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";

export default function useFilteredUsers() {
  const [input, setInput] = useState("");
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);
  const originUsers = useAppSelector((store) => Object.values(store.users.byId), shallowEqual);
  const enableContact = useAppSelector(
    (store) => store.server.contact_verification_enable,
    shallowEqual
  );
  const [filteredUsers, setFilteredUsers] = useState<StoredUser[]>([]);
  const useContactList = enableContact && !isAdmin;
  const users = useContactList ? originUsers.filter((u) => u.status == "added") : originUsers;
  useEffect(() => {
    if (!input) {
      setFilteredUsers(users);
    } else {
      let str = ["", escapeRegExp(input.toLowerCase()), ""].join(".*");
      let reg = new RegExp(str);
      setFilteredUsers(
        users.filter((c) => {
          if (!c) return false;
          return reg.test(c.name.toLowerCase());
        })
      );
    }
  }, [input, users.length]);

  const updateInput = (val: string) => {
    setInput(val);
  };

  return {
    input,
    users: filteredUsers,
    uids: filteredUsers.map((u) => u.uid),
    updateInput
  };
}
