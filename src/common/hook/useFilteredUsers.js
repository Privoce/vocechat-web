import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export default function useFilteredUsers() {
  const [input, setInput] = useState("");
  const contacts = useSelector((store) => store.contacts);
  const [filteredUsers, setFilteredUsers] = useState(contacts);
  useEffect(() => {
    if (!input) {
      setFilteredUsers(contacts);
    } else {
      let str = ["", ...input.toLowerCase(), ""].join(".*");
      let reg = new RegExp(str);
      setFilteredUsers(
        contacts.filter((c) => {
          return reg.test(c.name.toLowerCase());
        })
      );
    }
  }, [input, contacts]);
  const updateInput = (val) => {
    setInput(val);
  };
  return {
    input,
    contacts: filteredUsers,
    updateInput,
  };
}
