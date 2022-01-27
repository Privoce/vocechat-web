import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Message from "../../common/component/Message";
import Send from "../../common/component/Send";
// import msgs from "./channel.msg.mock.json";
import Contact from "../../common/component/Contact";
import { useGetContactsQuery } from "../../app/services/contact";

const StyledWrapper = styled.article`
  position: relative;
  width: 100%;
  background: #fff;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .head {
    height: 56px;
    padding: 0 20px 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
    .txt {
      display: flex;
      align-items: center;
      gap: 5px;
      .title {
        font-size: 16px;
        line-height: 24px;
        color: #1c1c1e;
      }
      .desc {
        margin-left: 8px;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #616161;
      }
    }
  }
  .main {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    padding: 0 0 20px 16px;
    .chat {
      width: 890px;
      padding: 18px 0;
    }
  }
`;
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
    <StyledWrapper>
      <header className="head">
        <Contact interactive={false} uid={currUser.uid} />
        {/* <ul className="members">members</ul> */}
      </header>
      <main className="main">
        <div className="chat">
          {Object.entries(msgs).map(([mid, msg]) => {
            if (!msg) return null;
            const { from_uid, content, created_at } = msg;
            return (
              <Message
                key={mid}
                time={created_at}
                uid={from_uid}
                content={content}
              />
            );
          })}
        </div>
      </main>
      <Send type="user" name={currUser?.name} id={currUser?.uid} />
    </StyledWrapper>
  );
}
