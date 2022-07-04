import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/store";

export default function useFilteredUsers() {
  const [input, setInput] = useState("");
  const users = useAppSelector((store) => Object.values(store.users.byId));
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    if (!input) {
      setFilteredUsers(users);
    } else {
      let str = ["", input.toLowerCase(), ""].join(".*");
      let reg = new RegExp(str);
      setFilteredUsers(
        users.filter((c) => {
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
