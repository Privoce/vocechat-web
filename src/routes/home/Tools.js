// import React from 'react';
import { RiAddFill } from "react-icons/ri";

import styled from "styled-components";
import { IoLogoGithub } from "react-icons/io5";

const StyledWrapper = styled.div`
  padding: 0 6px;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  > hr {
    border: none;
    width: 40%;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
  .tools {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .tool,
    .add {
      cursor: pointer;
      gap: 9px;
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #4b5563;
    }
    .tool {
      padding: 5px 4px;
      .logo {
        border-radius: 5.5px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        white-space: nowrap;
      }
      &.add .logo {
        background: none;
        .icon {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
`;
export default function Tools({ expand = true }) {
  return (
    <StyledWrapper>
      <hr />
      <ul className="tools">
        <li className="tool">
          <div className="logo">
            <img
              className="icon"
              src="https://static.nicegoodthings.com/project/ext/webrowse.logo.png"
              alt="logo"
            />
          </div>
          {expand && (
            <h2 className="title animate__animated animate__fadeIn">
              Webrowse
            </h2>
          )}
        </li>
        <li className="tool">
          <div className="logo">
            <IoLogoGithub size={40} className="icon" />
          </div>
          {expand && (
            <h2 className="title animate__animated animate__fadeIn">Github</h2>
          )}
        </li>
        <li className="tool add">
          <div className="logo">
            <RiAddFill className="icon" size={40} color="#4B5563" />
          </div>
          {expand && (
            <h2 className="title animate__animated animate__fadeIn">
              Add new app
            </h2>
          )}
        </li>
      </ul>
    </StyledWrapper>
  );
}
