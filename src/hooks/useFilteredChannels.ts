import { useEffect, useState } from "react";

import { useAppSelector } from "@/app/store";
import { Channel } from "@/types/channel";
import { shallowEqual } from "react-redux";

export default function useFilteredChannels() {
  const [input, setInput] = useState("");
  const channels = useAppSelector((store) => Object.values(store.channels.byId), shallowEqual);
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);

  useEffect(() => {
    if (!input) {
      setFilteredChannels(channels);
    } else {
      let str = ["", ...input.toLowerCase(), ""].join(".*");
      let reg = new RegExp(str);
      setFilteredChannels(
        channels.filter((c) => {
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
    channels: filteredChannels,
    updateInput
  };
}
