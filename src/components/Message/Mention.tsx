// import { FC, ReactNode } from "react";
import Tippy from "@tippyjs/react";

import { useAppSelector } from "@/app/store";
import Profile from "../Profile";
import { shallowEqual } from "react-redux";

interface Props {
  uid: number;
  popover?: boolean;
  cid?: number;
  textOnly?: boolean;
}

const Mention = ({ uid, popover = true, cid, textOnly = false }: Props) => {
  const usersData = useAppSelector((store) => store.users.byId, shallowEqual);
  const user = usersData[uid];
  if (!user) return null;
  if (textOnly) return <>{`@${user.name}`}</>;
  if (!popover) return <span className="px-0.5 text-primary-400">{`@${user.name}`}</span>;
  return (
    <Tippy
      interactive
      placement="top"
      trigger="click"
      content={<Profile uid={uid} type="card" cid={cid} />}
    >
      <span className="px-0.5 text-primary-400 cursor-pointer">{`@${user.name}`}</span>
    </Tippy>
  );
};

export default Mention;
