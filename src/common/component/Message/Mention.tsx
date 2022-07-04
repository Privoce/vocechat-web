import { FC, ReactNode } from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
import Profile from "../Profile";
import { useAppSelector } from "../../../app/store";

const Styled = styled.span`
  padding: 0 2px;
  color: #1fe1f9;
  &.clickable {
    cursor: pointer;
  }
`;

interface Props {
  uid: number;
  popover?: boolean;
  cid?: number;
  textOnly?: boolean;
}

const Mention: FC<Props> = ({ uid, popover = true, cid, textOnly = false }) => {
  const usersData = useAppSelector((store) => store.users.byId);
  const user = usersData[uid];
  if (!user) return null;
  if (textOnly) return `@${user.name}`;
  return (
    <Tippy
      disabled={!popover}
      interactive
      placement="top"
      trigger="click"
      content={<Profile uid={uid} type="card" cid={cid} />}
    >
      <Styled className={popover ? "clickable" : ""}>{`@${user.name}`}</Styled>
    </Tippy>
  );
};

export default Mention;
