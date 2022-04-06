// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "rooks";

import addIcon from "../../../assets/icons/add.person.svg?url";
import callIcon from "../../../assets/icons/call.svg?url";
import videoIcon from "../../../assets/icons/video.svg?url";
import useChatScroll from "../../../common/hook/useChatScroll";
import Send from "../../../common/component/Send";
import { useReadMessageMutation } from "../../../app/services/message";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import { StyledHeader, StyledDMChat } from "./styled";
import { renderMessageFragment } from "../utils";
export default function DMChat({ uid = "", dropFiles = [] }) {
  const [updateReadIndex] = useReadMessageMutation();
  const updateReadDebounced = useDebounce(updateReadIndex, 300);
  console.log("dm files", dropFiles);
  // const [mids, setMids] = useState([]);
  const { msgIds, currUser, messageData, footprint, loginUid } = useSelector(
    (store) => {
      return {
        loginUid: store.authData.uid,
        footprint: store.footprint,
        currUser: store.contacts.byId[uid],
        msgIds: store.userMessage.byId[uid] || [],
        messageData: store.message,
      };
    }
  );
  const ref = useChatScroll(msgIds);

  if (!currUser) return null;
  // console.log("user msgs", msgs);
  const readIndex = footprint.readUsers[uid];
  return (
    <Layout
      to={uid}
      context="user"
      dropFiles={dropFiles}
      header={
        <StyledHeader>
          <Contact interactive={false} uid={currUser.uid} />
          <ul className="opts">
            <li className="opt">
              <img src={callIcon} alt="opt icon" />
            </li>
            <li className="opt">
              <img src={videoIcon} alt="opt icon" />
            </li>
            <li className="opt">
              <img src={addIcon} alt="opt icon" />
            </li>
          </ul>
        </StyledHeader>
      }
    >
      <StyledDMChat>
        <div className="chat" ref={ref}>
          {[...msgIds]
            .sort((a, b) => {
              return Number(a) - Number(b);
            })
            .map((mid, idx) => {
              const curr = messageData[mid];
              const prev = idx == 0 ? null : messageData[msgIds[idx - 1]];
              const read = curr?.from_uid == loginUid || mid <= readIndex;
              return renderMessageFragment({
                updateReadIndex: updateReadDebounced,
                read,
                prev,
                curr,
                contextId: uid,
                context: "user",
              });
            })}
        </div>
        <Send
          key={currUser?.uid}
          context="user"
          name={currUser?.name}
          id={currUser?.uid}
        />
      </StyledDMChat>
    </Layout>
  );
}
