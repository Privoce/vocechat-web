import { useState, useEffect } from "react";
import { StoredUser } from "../../app/slices/users";
import { useAppSelector } from "../../app/store";

export default function useFilteredUsers() {
  const [input, setInput] = useState("");
  const users = useAppSelector((store) => Object.values(store.users.byId));
  const [filteredUsers, setFilteredUsers] = useState<StoredUser[]>([]);
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
  }, [input]);

  const updateInput = (val: string) => {
    setInput(val);
  };

  return {
    input,
    users: filteredUsers,
    updateInput
  };
}
