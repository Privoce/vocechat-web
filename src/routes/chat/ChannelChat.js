import { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Message from "../../common/component/Message";
import ChannelIcon from "../../common/component/ChannelIcon";
import Send from "../../common/component/Send";
import { useGetContactsQuery } from "../../app/services/contact";
// import msgs from "./channel.msg.mock.json";
import Contact from "../../common/component/Contact";

const StyledWrapper = styled.article`
  position: relative;
  width: 100%;
  background: #fff;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .head {
    height: 56px;
    padding: 0 20px;
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
    .notification {
      padding: 3px 8px;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      color: #fff;
      position: absolute;
      top: 0;
      left: 10px;
      width: 900px;
      height: 24px;
      background: linear-gradient(135deg, #3c8ce7 0%, #00eaff 100%);
      border-radius: 0px 0px 8px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .clear {
        cursor: pointer;
        color: inherit;
        border: none;
        background: none;
        outline: none;
      }
    }
    .channel {
      width: 684px;
      .info {
        padding-top: 114px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        .title {
          font-weight: bold;
          font-size: 36px;
          line-height: 44px;
        }
        .desc {
          color: #78787c;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
        .edit {
          color: #3c8ce7;
          padding: 0;
          border: none;
          outline: none;
          background: none;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
      }
      .chat {
        padding: 18px 0;
      }
    }
    .contacts {
      display: flex;
      flex-direction: column;
      gap: 5px;
      /* todo */
      width: 226px;
      height: calc(100vh - 56px);
      overflow-y: scroll;
      background: #f5f6f7;
      padding: 16px;
    }
  }
`;
export default function ChannelChat({ cid = "", data = {} }) {
  const msgs = useSelector((store) => {
    return store.channelMsg[cid] || {};
  });
  const { data: users } = useGetContactsQuery();
  useEffect(() => {
    console.log({ cid });
  }, [cid]);
  const { name, description, is_public, members = [] } = data;
  const filteredUsers =
    members.length == 0
      ? users
      : users.filter((u) => {
          return members.includes(u.uid);
        });
  console.log("channel message list", msgs);
  return (
    <StyledWrapper>
      <header className="head">
        <div className="txt">
          <ChannelIcon personal={!is_public} />
          <span className="title">{name}</span>

          <span className="desc">{description}</span>
        </div>
        <ul className="members">members</ul>
      </header>
      <main className="main">
        <div className="notification">
          <div className="content">25+ new messages since 3:24 PM</div>
          <button className="clear">Mark As Read</button>
        </div>
        <div className="channel">
          <div className="info">
            <h2 className="title">Welcome to #{name} !</h2>
            <p className="desc">This is the start of the #{name} channel. </p>
            <button className="edit">Edit Channel</button>
          </div>
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
        </div>
        <div className="contacts">
          {filteredUsers.map(({ name, status, uid }) => {
            return <Contact key={name} uid={uid} status={status} />;
          })}
        </div>
      </main>
      <Send id={cid} type="channel" name={name} />
    </StyledWrapper>
  );
}
