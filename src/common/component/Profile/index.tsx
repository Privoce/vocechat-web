import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import IconMessage from "../../../assets/icons/message.svg";
import IconCall from "../../../assets/icons/call.svg";
import IconMore from "../../../assets/icons/more.svg";
import Avatar from "../Avatar";
import StyledWrapper from "./styled";
import StyledMenu from "../styled/Menu";
import useUserOperation from "../../hook/useUserOperation";
import { useAppSelector } from "../../../app/store";

interface Props {
  uid: number;
  type?: "embed" | "card";
  cid?: number;
}

const Profile: FC<Props> = ({ uid, type = "embed", cid }) => {
  const {
    canCall,
    call,
    canCopyEmail,
    copyEmail,
    removeFromChannel,
    canRemoveFromChannel,
    canRemove,
    removeUser
  } = useUserOperation({ uid, cid });

  const { data } = useAppSelector((store) => {
    return {
      data: store.users.byId[uid]
    };
  });

  if (!data) return null;
  // console.log("profile", data);
  const {
    name,
    email,
    avatar
    // introduction = "This guy has nothing to introduce",
  } = data;
  const enableCall = type == "card" && canCall;
  const canRemoveFromServer = type == "embed" && canRemove;
  const hasMore = enableCall || email || canRemoveFromChannel || canRemoveFromServer;

  return (
    <StyledWrapper className={type}>
      <Avatar className="rounded-full w-20 h-20 object-cover" url={avatar} name={name} />
      <h2 className="text-lg select-text font-bold text-[#1c1c1e]">{name}</h2>
      <span className="text-sm text-[#98a2b3] select-text">{email}</span>
      {/* <p className="intro">{introduction}</p> */}
      <ul className="icons">
        <NavLink to={`/chat/dm/${uid}`}>
          <li className="icon chat">
            <IconMessage />
            <span className="txt">Message</span>
          </li>
        </NavLink>
        {/* <NavLink to={`#`}> */}
        {enableCall && (
          <li className="icon call" onClick={call}>
            <IconCall />
            <span className="txt">Call</span>
          </li>
        )}
        {/* </NavLink> */}
        <Tippy
          disabled={!hasMore}
          interactive
          popperOptions={{ strategy: "fixed" }}
          placement="bottom-start"
          trigger="click"
          hideOnClick={true}
          content={
            <StyledMenu>
              {enableCall && (
                <li className="item" onClick={call}>
                  {/* <IconCall className="icon" /> */}
                  Call
                </li>
              )}
              {canCopyEmail && (
                <li className="item" onClick={copyEmail.bind(undefined, email)}>
                  Copy Email
                </li>
              )}
              {canRemoveFromChannel && (
                <li className="item danger" onClick={removeFromChannel.bind(null, uid)}>
                  Remove from Channel
                </li>
              )}
              {canRemoveFromServer && (
                <li className="item danger" onClick={removeUser.bind(null, uid)}>
                  Remove from Server
                </li>
              )}
            </StyledMenu>
          }
        >
          <li className={`icon more ${hasMore ? "" : "disabled"}`}>
            <IconMore />
            <span className="txt">More</span>
          </li>
        </Tippy>
      </ul>
    </StyledWrapper>
  );
};

export default memo(Profile);
