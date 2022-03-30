import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export default function useFilteredChannels() {
  const [input, setInput] = useState("");
  const channels = useSelector((store) => Object.values(store.channels.byId));
  const [filteredChannels, setfilteredChannels] = useState([]);
  useEffect(() => {
    if (!input) {
      setfilteredChannels(channels);
    } else {
      let str = ["", ...input.toLowerCase(), ""].join(".*");
      let reg = new RegExp(str);
      setfilteredChannels(
        channels.filter((c) => {
          return reg.test(c.name.toLowerCase());
        })
      );
    }
  }, [input]);
  const updateInput = (val) => {
    setInput(val);
  };
  return {
    input,
    channels: filteredChannels,
    updateInput,
  };
}
