import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearAuthData } from "../../app/slices/auth.data";
// import BASE_URL from "../../app/config";
import { useLazyLogoutQuery } from "../../app/services/auth";
import Avatar from "./Avatar";
const StyledWrapper = styled.div`
  background-color: #e5e5e5;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 8px;
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
export default function CurrentUser({ expand = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isSuccess }] = useLazyLogoutQuery();
  const { user } = useSelector((store) => store.authData);
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearAuthData());
      navigate("/login");
    }
  }, [isSuccess]);

  if (!user) return null;
  const { uid, name, avatar } = user;
  return (
    <StyledWrapper>
      <div className="profile">
        <Avatar
          onDoubleClick={handleLogout}
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
      {expand && (
        <div className="settings">
          <img
            src="https://static.nicegoodthings.com/project/rustchat/icon.speaker.svg"
            className="icon"
            alt="mic icon"
          />
          <img
            src="https://static.nicegoodthings.com/project/rustchat/icon.mic.svg"
            className="icon"
            alt="sound icon"
          />
        </div>
      )}
    </StyledWrapper>
  );
}
