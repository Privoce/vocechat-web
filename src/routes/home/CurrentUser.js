// import React from 'react';
import styled from "styled-components";
import { AiOutlineCaretDown, AiOutlineSound } from "react-icons/ai";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useSelector } from "react-redux";

const StyledWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 12px;
  width: -webkit-fill-available;
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
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .toggle {
    }
  }
  .settings {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      cursor: pointer;
    }
  }
`;
export default function CurrentUser({ collaspe = false }) {
  const { user } = useSelector((store) => store.authData);
  if (!user) return null;
  const { name } = user;
  return (
    <StyledWrapper>
      <div className="profile" title={name}>
        <img
          title={name}
          src={`https://avatars.dicebear.com/api/adventurer-neutral/${name}.svg`}
          alt="user avatar"
          className="avatar"
        />
        <AiOutlineCaretDown className="toggle" width={20} color="#C4C4C4" />
      </div>
      {!collaspe && (
        <div className="settings">
          <AiOutlineSound className="icon" size={15} color="#1C1C1E" />
          <MdOutlineKeyboardVoice className="icon" size={15} color="#1C1C1E" />
        </div>
      )}
    </StyledWrapper>
  );
}
