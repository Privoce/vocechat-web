import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "../../../common/component/Message";
import Send from "../../../common/component/Send";
import Contact from "../../../common/component/Contact";
import { useGetContactsQuery } from "../../../app/services/contact";
import Layout from "../Layout";

import { StyledHeader, StyledDMChat } from "./styled";

export default function DMChat({ uid = "", dropFiles = [] }) {
  console.log("dm files", dropFiles);
  const [dragFiles, setDragFiles] = useState([]);
  const msgs = useSelector((store) => {
    return store.userMsg[uid] || {};
  });
  const { data: contacts } = useGetContactsQuery();
  const [currUser, setCurrUser] = useState(null);
  useEffect(() => {
    console.log({ uid });
    if (uid && contacts) {
      setCurrUser(contacts.find((c) => c.uid == uid));
    }
  }, [uid, contacts]);
  useEffect(() => {
    if (dropFiles.length) {
      setDragFiles(dropFiles);
    }
  }, [dropFiles]);

  if (!currUser) return null;
  console.log("user msgs", msgs);
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
        <div className="chat">
          {Object.entries(msgs).map(([mid, msg]) => {
            if (!msg) return null;
            console.log("user msg", msg);
            const { from_uid, content, content_type, created_at, unread } = msg;
            return (
              <Message
                content_type={content_type}
                unread={unread}
                fromUid={from_uid}
                mid={mid}
                key={mid}
                time={created_at}
                uid={uid}
                content={content}
              />
            );
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
