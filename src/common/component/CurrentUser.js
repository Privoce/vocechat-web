// import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import soundIcon from "../../assets/icons/sound.on.svg?url";
import micIcon from "../../assets/icons/mic.on.svg?url";
import SignalIcon from "../../assets/icons/signal.svg?url";
import HeadPhoneIcon from "../../assets/icons/headphone.svg?url";
import VideoIcon from "../../assets/icons/video.svg?url";
import videoDisableIcon from "../../assets/icons/video.disable.svg?url";

import Avatar from "./Avatar";
// import UserGuide from "./UserGuide";
import {
  toggleChat,
  toggleVideo,
  toggleAudio,
} from "../../app/slices/videocall";

const StyledWrapper = styled.div`
  background-color: #e5e5e5;
  position: sticky;
  bottom: 16px;
  margin: 8px;
  width: 94%;
  width: -webkit-fill-available;
  border-radius: 25px;
  padding: 7px 8px 7px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .profile {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .toggle {
    }
    .info {
      display: flex;
      flex-direction: column;
      .name {
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        color: #27272a;
      }
      .id {
        padding: 0 2px;
        font-size: 12px;
        line-height: 18px;
        color: #52525b;
      }
    }
  }
  .settings {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
`;
const CurrentUserWrapper = styled.div`
  background-color: #e5e5e5;
  position: sticky;
  bottom: 16px;
  margin: 8px;
  width: 94%;
  width: -webkit-fill-available;
  border-radius: 25px;
  padding: 7px 8px 7px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .signal {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    .status {
      font-size: 14px;
      color: #027a48;
      font-weight: 700;
    }
    .title {
      font-size: 12px;
      color: #52525b;
      margin-top: 5px;
    }
  }
  .control {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #e8e8e9;
    .button {
      display: flex;
      align-items: center;
      status: Default;
      background: #ffffff80;
      border-radius: 8px;
      padding: 8px 12px;
      margin: 10px 0px;
    }
  }
`;
export default function CurrentUser() {
  const currUser = useSelector((store) => {
    return store.contacts.byId[store.authData.uid];
  });
  const onChat = useSelector((store) => {
    return store.videoCall.onChat;
  });
  const videoState = useSelector((state) => state.videoCall.trackState.video);
  const dispatch = useDispatch();
  if (!currUser) return null;
  const { uid, name, avatar } = currUser;
  return (
    <CurrentUserWrapper>
      {onChat && (
        <div
          style={{
            width: "100%",
          }}
        >
          <div className="signal">
            <div style={{ display: "flex" }}>
              <img src={SignalIcon} className="icon" alt="signal icon" />
              <div style={{ marginLeft: "10px" }}>
                <div className="status">Voice Connected</div>
                <div className="title">RustChat/lounge</div>
              </div>
            </div>
            <div>
              <img src={HeadPhoneIcon} className="icon" alt="signal icon" />
            </div>
          </div>
          <div className="control">
            <div className="button" onClick={() => dispatch(toggleVideo())}>
              <img
                src={videoState ? VideoIcon : videoDisableIcon}
                className="icon"
                alt="video icon"
              />
              Video
            </div>
            <div className="button" onClick={() => dispatch(toggleAudio())}>
              <img
                src={videoState ? VideoIcon : videoDisableIcon}
                className="icon"
                alt="signal icon"
              />
              Screen
            </div>
          </div>
        </div>
      )}
      <StyledWrapper>
        <div className="profile">
          <Avatar
            url={avatar}
            name={name}
            alt="user avatar"
            className="avatar"
          />
          <div className="info">
            <span className="name">{name}</span>
            <span className="id">#{uid}</span>
          </div>
        </div>
        {/* {expand && ( */}
        <div className="settings">
          <img
            src={soundIcon}
            className="icon"
            alt="mic icon"
            onClick={() => dispatch(toggleChat())}
          />
          <img src={micIcon} className="icon" alt="sound icon" />
        </div>
        {/* )} */}
      </StyledWrapper>
    </CurrentUserWrapper>
  );
}
