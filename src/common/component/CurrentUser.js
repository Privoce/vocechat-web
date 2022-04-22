// import { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import soundIcon from "../../assets/icons/sound.on.svg?url";
import micIcon from "../../assets/icons/mic.on.svg?url";
import Avatar from "./Avatar";
import UserGuide from "./UserGuide";
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
export default function CurrentUser() {
  const currUser = useSelector((store) => {
    return store.contacts.byId[store.authData.uid];
  });

  if (!currUser) return null;
  const { uid, name, avatar } = currUser;
  return (
    <UserGuide step={1}>
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
        <div className="settings">
          <img src={soundIcon} className="icon" alt="mic icon" />
          <img src={micIcon} className="icon" alt="sound icon" />
        </div>
      </StyledWrapper>
    </UserGuide>
  );
}
