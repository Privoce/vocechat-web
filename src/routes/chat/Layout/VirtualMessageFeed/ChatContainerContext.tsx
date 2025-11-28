import { createContext } from "react";
import { VirtuosoHandle } from "react-virtuoso";

export const ChatContainerContext = createContext<React.RefObject<VirtuosoHandle | null> | null>(
  null
);