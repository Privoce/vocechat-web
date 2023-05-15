// import { FC, ReactNode } from "react";
import Tippy from "@tippyjs/react";
import Profile from "../Profile";
import { useAppSelector } from "@/app/store";

interface Props {
  uid: number;
  popover?: boolean;
  cid?: number;
  textOnly?: boolean;
}

const Mention = ({ uid, popover = true, cid, textOnly = false }: Props) => {
  const usersData = useAppSelector((store) => store.users.byId);
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
