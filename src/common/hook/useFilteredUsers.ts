import { useState, useEffect } from "react";
import { StoredUser } from "../../app/slices/users";
import { useAppSelector } from "../../app/store";
import { compareVersion } from "../utils";

export default function useFilteredUsers() {
  const [input, setInput] = useState("");
  const { originUsers, serverVersion } = useAppSelector((store) => {
    return {
      originUsers: Object.values(store.users.byId),
      serverVersion: store.server.version
    };
  });
  const enableContact = compareVersion(serverVersion, "0.3.7") >= 0;
  const [filteredUsers, setFilteredUsers] = useState<StoredUser[]>([]);
  const users = enableContact ? originUsers.filter((u) => u.status == "added") : originUsers;
  useEffect(() => {
    if (!input) {
      setFilteredUsers(users);
    } else {
      let str = ["", input.toLowerCase(), ""].join(".*");
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
    updateInput
  };
}
