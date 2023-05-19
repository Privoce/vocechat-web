import { FC, ReactElement } from "react";

import useTabBroadcast from "@/hooks/useTabBroadcast";
import InactiveScreen from "./InactiveScreen";

interface Props {
  children: ReactElement;
}
const RequireSingleTab: FC<Props> = ({ children }) => {
  const { tabActive } = useTabBroadcast();
  // console.log("authhhhh", allowGuest, token, guest);
  return tabActive ? children : <InactiveScreen />;
};

export default RequireSingleTab;
