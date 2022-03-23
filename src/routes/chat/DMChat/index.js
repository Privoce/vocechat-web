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
  const { msgIds, currUser, messageData } = useSelector((store) => {
    return {
      currUser: store.contacts.byId[uid],
      msgIds: store.userMessage.byId[uid] || [],
      messageData: store.message,
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
              const prev = idx == 0 ? null : messageData[msgIds[idx - 1]];
              return renderMessageFragment({
                prev,
                curr,
                contextId: uid,
                context: "user",
              });
            })}
        </div>
        <Send
          dragFiles={dragFiles}
          type="user"
          name={currUser?.name}
          id={currUser?.uid}
        />
      </StyledDMChat>
    </Layout>
  );
}
