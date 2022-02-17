// import React from 'react'
import styled from "styled-components";
import toast from "react-hot-toast";

const StyledCmds = styled.ul`
  position: absolute;
  right: 10px;
  top: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  background-color: #fff;
  visibility: hidden;
  .cmd {
    cursor: pointer;
    padding: 4px;
    img {
      width: 24px;
      height: 24px;
    }
  }
`;
// https://static.nicegoodthings.com/project/rustchat/icon.forward.svg
// https://static.nicegoodthings.com/project/rustchat/icon.edit.svg
export default function Commands() {
  const handleClick = () => {
    toast.success("cooming soon");
  };
  return (
    <StyledCmds className="cmds">
      <li className="cmd" onClick={handleClick}>
        <img
          src="https://static.nicegoodthings.com/project/rustchat/icon.reply.svg"
          alt="icon emoji"
        />
      </li>
      <li className="cmd" onClick={handleClick}>
        <img
          src="https://static.nicegoodthings.com/project/rustchat/icon.edit.svg"
          alt="icon emoji"
        />
      </li>
      <li className="cmd" onClick={handleClick}>
        <img
          src="https://static.nicegoodthings.com/project/rustchat/icon.dots.svg"
          alt="icon emoji"
        />
      </li>
    </StyledCmds>
  );
}
