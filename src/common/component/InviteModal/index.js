// import React from 'react'
import styled from "styled-components";
import { useSelector } from "react-redux";
import InviteByEmail from "./InviteByEmail";
import AddMembers from "./AddMembers";
import CloseIcon from "../../../assets/icons/close.svg";
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
  border-radius: var(--br);
  padding: 16px;
  min-width: 408px;
  > .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #374151;
    .close {
      cursor: pointer;
    }
  }
`;
import Modal from "../Modal";
// type: server,channel
export default function InviteModal({
  type = "server",
  cid = null,
  title = "",
  closeModal,
}) {
  const { channel, server } = useSelector((store) => {
    return {
      channel: store.channels.byId[cid],
      server: store.server,
    };
  });
  const finalTitle =
    type == "server" ? server.name : `#${title || channel?.name}`;
  return (
    <Modal>
      <Styled>
        <h2 className="title">
          Add friends to {finalTitle}
          <CloseIcon className="close" onClick={closeModal} />
        </h2>
        {!channel?.is_public && (
          <AddMembers cid={cid} closeModal={closeModal} />
        )}
        <InviteByEmail cid={channel?.is_public ? null : cid} />
      </Styled>
    </Modal>
  );
}
