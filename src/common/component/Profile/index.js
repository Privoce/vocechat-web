import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import IconMessage from "../../../assets/icons/message.svg";
import IconCall from "../../../assets/icons/call.svg";
import IconMore from "../../../assets/icons/more.svg";
import Avatar from "../Avatar";
import StyledWrapper from "./styled";
import StyledMenu from "../styled/Menu";
import useCopy from "../../hook/useCopy";
import { useRemoveMembersMutation } from "../../../app/services/channel";

export default function Profile({ uid = null, type = "embed", cid = null }) {
  const [
    removeFromChannel,
    { isSuccess: removeSuccess },
  ] = useRemoveMembersMutation();
  const { copy } = useCopy();
  const { data, channel, loginUid, isAdmin } = useSelector((store) => {
    return {
      data: store.contacts.byId[uid],
      channel: store.channels.byId[cid],
      loginUid: store.authData.uid,
      isAdmin: store.contacts.byId[store.authData.uid]?.is_admin,
    };
  });
  useEffect(() => {
    if (removeSuccess) {
      toast.success("Remove Successfully");
    }
  }, [removeSuccess]);

  if (!data) return null;
  // console.log("profile", data);
  const {
    name,
    email,
    avatar,
    // introduction = "This guy has nothing to introduce",
  } = data;
  const handleClick = () => {
    toast.success("cooming soon...");
  };
  const handlCopyEmail = () => {
    copy(email);
    hideAll();
  };
  const handleRemove = (uid) => {
    removeFromChannel({ id: +cid, members: [+uid] });
    hideAll();
  };
  const canCall = type !== "card" && loginUid != uid;
  const canRemoveFromChannel =
    cid &&
    !channel?.is_public &&
    (isAdmin || channel?.owner == loginUid) &&
    channel?.owner != uid;
  const hasMore = canCall || email || canRemoveFromChannel;
  return (
    <StyledWrapper className={type}>
      <Avatar className="avatar" url={avatar} name={name} />
      <h2 className="name">{name}</h2>
      <span className="email">{email}</span>
      {/* <p className="intro">{introduction}</p> */}
      <ul className="icons">
        <NavLink to={`/chat/dm/${uid}`}>
          <li className="icon chat">
            <IconMessage />
            <span className="txt">Message</span>
          </li>
        </NavLink>
        {/* <NavLink to={`#`}> */}
        {canCall && (
          <li className="icon call" onClick={handleClick}>
            <IconCall />
            <span className="txt">Call</span>
          </li>
        )}
        {/* </NavLink> */}
        <Tippy
          disabled={!hasMore}
          interactive
          placement="bottom-start"
          trigger="click"
          hideOnClick={true}
          content={
            <StyledMenu>
              {canCall && <li className="item">Call</li>}
              {email && (
                <li className="item" onClick={handlCopyEmail}>
                  Copy Email
                </li>
              )}
              {canRemoveFromChannel && (
                <li
                  className="item danger"
                  onClick={handleRemove.bind(null, uid)}
                >
                  Remove from Channel
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
}
