import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import addIcon from "../../../assets/icons/add.person.svg?url";
import callIcon from "../../../assets/icons/call.svg?url";
import videoIcon from "../../../assets/icons/video.svg?url";
import useChatScroll from "../../../common/hook/useChatScroll";
import Send from "../../../common/component/Send";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import { StyledHeader, StyledDMChat } from "./styled";
import { renderMessageFragment } from "../utils";
export default function DMChat({ uid = "", dropFiles = [] }) {
  console.log("dm files", dropFiles);
  const [dragFiles, setDragFiles] = useState([]);
  // const [mids, setMids] = useState([]);
  const { msgIds, currUser, messageData, readUsers } = useSelector((store) => {
    return {
      currUser: store.contacts.byId[uid],
      msgIds: store.userMessage.byId[uid] || [],
      messageData: store.message,
      readUsers: store.footprint.readUser || {},
    };
  });
  const ref = useChatScroll(msgIds);
  // useEffect(() => {
  //   setMids(msgIds);
  // }, [msgIds]);
  useEffect(() => {
    if (dropFiles.length) {
      setDragFiles(dropFiles);
    }
  }, [dropFiles]);

  if (!currUser) return null;
  // console.log("user msgs", msgs);
  const readIndex = readUsers[uid] || 0;
  return (
    <Layout
      setDragFiles={setDragFiles}
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
              const self = curr.from_uid == currUser.uid;
              const read = self ? true : mid <= readIndex ? true : false;
              const prev = idx == 0 ? null : messageData[msgIds[idx - 1]];
              return renderMessageFragment({
                prev,
                curr,
                contextId: uid,
                read,
                context: "user",
              });
            })}
        </div>
      </StyledDMChat>
      <Send
        dragFiles={dragFiles}
        type="user"
        name={currUser?.name}
        id={currUser?.uid}
      />
    </Layout>
  );
}
