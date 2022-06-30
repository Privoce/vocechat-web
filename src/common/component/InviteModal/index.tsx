import styled from "styled-components";
import InviteByEmail from "./InviteByEmail";
import AddMembers from "./AddMembers";
import CloseIcon from "../../../assets/icons/close.svg";
import Modal from "../Modal";
import { useAppSelector } from "../../../app/store";
import { FC } from "react";

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 25px 50px rgba(31, 41, 55, 0.25);
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

// type: server,channel

interface Props {
  type?: "server" | "channel";
  cid?: number;
  title?: string;
  closeModal: () => void;
}

const InviteModal: FC<Props> = ({ type = "server", cid, title = "", closeModal }) => {
  const { channel, server } = useAppSelector((store) => {
    return {
      channel: store.channels.byId[cid],
      server: store.server
    };
  });
  const finalTitle = type == "server" ? server.name : `#${title || channel?.name}`;
  return (
    <Modal>
      <Styled>
        <h2 className="title">
          Add friends to {finalTitle}
          <CloseIcon className="close" onClick={closeModal} />
        </h2>
        {!channel?.is_public && <AddMembers cid={cid} closeModal={closeModal} />}
        <InviteByEmail cid={channel?.is_public ? undefined : cid} />
      </Styled>
    </Modal>
  );
};

export default InviteModal;
