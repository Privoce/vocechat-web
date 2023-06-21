import { useEffect, useState } from "react";
import { escapeRegExp } from "lodash";

import { StoredUser } from "@/app/slices/users";
import { useAppSelector } from "@/app/store";

export default function useFilteredUsers() {
  const [input, setInput] = useState("");
  const { originUsers, enableContact, isAdmin } = useAppSelector((store) => {
    return {
      isAdmin: store.authData.user?.is_admin,
      enableContact: store.server.contact_verification_enable,
      originUsers: Object.values(store.users.byId)
    };
  });
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
