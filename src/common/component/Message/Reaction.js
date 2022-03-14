import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { emojis } from "./EmojiPicker";
const StyledWrapper = styled.span`
  display: flex;
  gap: 8px;
  font-size: 16px;
  /* align-items: center; */
  .reaction {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    em {
      font-size: 12px;
      color: #999;
    }
  }
`;
export default function Reaction({ reactions = null }) {
  // const {
  //     messageData,
  //     reactionMessageData,
  //     contactsData,
  //     loginedUser,
  //   } = useSelector((store) => {
  //     return {
  //       reactionMessageData: store.reactionMessage,
  //       messageData: store.message,
  //       contactsData: store.contacts.byId,
  //       loginedUser: store.authData.user,
  //     };
  //   });

  if (!reactions) return null;
  return (
    <StyledWrapper className="reactions">
      {Object.entries(reactions).map(([reaction, uids]) => {
        return uids.length > 0 ? (
          <i
            className="reaction"
            // data-count={count > 1 ? count : ""}
            key={reaction}
          >
            {emojis[reaction]}

            {uids.length > 1 ? <em>{`+${uids.length}`} </em> : null}
          </i>
        ) : null;
      })}
    </StyledWrapper>
  );
}
