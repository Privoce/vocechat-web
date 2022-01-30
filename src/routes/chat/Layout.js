import React from "react";
import styled from "styled-components";
const StyledWrapper = styled.article`
  position: relative;
  width: 100%;
  background: #fff;
  height: 100vh;
  .head {
    height: 56px;
    padding: 0 20px;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  }
  .main {
    height: calc(100vh - 56px);
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    .members {
      border-top: 1px solid transparent;
    }
  }
`;

export default function Layout({ children, header, contacts = null }) {
  return (
    <StyledWrapper>
      <header className="head">{header}</header>
      <main className="main">
        {children}
        {contacts && <div className="members">{contacts}</div>}
      </main>
    </StyledWrapper>
  );
}
