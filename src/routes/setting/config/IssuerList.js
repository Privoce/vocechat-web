// import React from 'react'
import styled from "styled-components";
import Input from "../../../common/component/styled/Input";
import Toggle from "../../../common/component/styled/Toggle";
import IconPlus from "../../../assets/icons/plus.circle.svg";
import IconMinus from "../../../assets/icons/minus.circle.svg";
const Styled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .issuers {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .issuer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        gap: 16px;
        justify-content: space-between;
        .remove {
          cursor: pointer;
        }
        .icon {
          width: 32px;
          height: 32px;
        }
        .url {
          width: 342px;
        }
      }
    }
  }
  .add {
    cursor: pointer;
  }
`;
export default function IssuerList() {
  return (
    <Styled>
      <ul className="issuers">
        <li className="issuer">
          <div className="left">
            <IconMinus className="remove" />
            <img
              src="https://static.nicegoodthings.com/project/ext/webrowse.logo.png"
              alt="logo"
              className="icon"
            />
            <Input
              prefix="https://"
              placeholder="Issuer Domain"
              className="url"
            />
          </div>
          <div className="right">
            <Toggle />
          </div>
        </li>
      </ul>
      <IconPlus className="add" />
    </Styled>
  );
}
