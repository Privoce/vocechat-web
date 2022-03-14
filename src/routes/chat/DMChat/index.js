import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useChatScroll from "../../../common/hook/useChatScroll";
import Message from "../../../common/component/Message";
import Send from "../../../common/component/Send";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";

import { StyledHeader, StyledDMChat } from "./styled";

export default function DMChat({ uid = "", dropFiles = [] }) {
  console.log("dm files", dropFiles);
  const [dragFiles, setDragFiles] = useState([]);
  // const [mids, setMids] = useState([]);
  const { msgIds, currUser } = useSelector((store) => {
    return {
      currUser: store.contacts.byId[uid],
      msgIds: store.userMessage.byId[uid] || [],
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
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.call.svg"
                alt="opt icon"
              />
            </li>
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.video.svg"
                alt="opt icon"
              />
            </li>
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.people.add.svg"
                alt="opt icon"
              />
            </li>
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.mark.read.svg"
                alt="opt icon"
              />
            </li>
          </ul>
        </StyledHeader>
      }
    >
      <StyledDMChat>
        <div className="chat" ref={ref}>
          {msgIds.map((mid) => {
            // if (!msg) return null;
            // console.log("user msg", msg);
            return <Message mid={mid} key={mid} contextId={uid} />;
          })}
        </div>
      </StyledDMChat>
      <div className="placeholder"></div>
      <Send
        dragFiles={dragFiles}
        type="user"
        name={currUser?.name}
        id={currUser?.uid}
      />
    </Layout>
  );
}
