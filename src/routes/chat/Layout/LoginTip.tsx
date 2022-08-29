import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const Styled = styled.div`
  display: flex;
  align-items: center;
  background: #e5e7eb;
  border-radius: var(--br);
  width: 100%;
  width: -webkit-fill-available;
  padding: 14px 18px;
  color: #aaa;
  .hand {
    font-size: 22px;
    margin-right: 10px;
  }
  .link {
    font-weight: bold;
    color: #333;
    padding: 0 8px;
  }
`;
type Props = {};

const LoginTip = (props: Props) => {
  return (
    <Styled>
      <i className="hand">👋</i>
      Please{" "}
      <NavLink className={"link"} to={`/login`}>
        Login/Register
      </NavLink>{" "}
      before you can send message
    </Styled>
  );
};

export default LoginTip;
