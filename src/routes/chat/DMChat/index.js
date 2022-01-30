import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "../../../common/component/Message";
import Send from "../../../common/component/Send";
import Contact from "../../../common/component/Contact";
import { useGetContactsQuery } from "../../../app/services/contact";
import Layout from "../Layout";

import { StyledHeader, StyledDMChat } from "./styled";

export default function DMChat({ uid = "" }) {
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
  if (!currUser) return null;
  console.log("user msgs", msgs);
  return (
    <Layout
      header={
        <StyledHeader>
          <Contact interactive={false} uid={currUser.uid} />
        </StyledHeader>
      }
    >
      <StyledDMChat>
        <div className="chat">
          {Object.entries(msgs).map(([mid, msg]) => {
            if (!msg) return null;
            console.log("user msg", msg);
            const { from_uid, content, created_at, unread } = msg;
            return (
              <Message
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
      <Send type="user" name={currUser?.name} id={currUser?.uid} />
    </Layout>
  );
}
