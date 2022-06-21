import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/store";
import { Channel } from "../../types/channel";

export default function useFilteredChannels() {
  const [input, setInput] = useState("");
  const channels = useAppSelector((store) => Object.values(store.channels.byId));
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);

  useEffect(() => {
    if (!input) {
      setFilteredChannels(channels);
    } else {
      let str = ["", ...input.toLowerCase(), ""].join(".*");
      let reg = new RegExp(str);
      setFilteredChannels(
        channels.filter((c) => {
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
    channels: filteredChannels,
    updateInput
  };
}
