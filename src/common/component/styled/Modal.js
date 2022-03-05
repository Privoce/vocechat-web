// import React from 'react'
import styled from "styled-components";
const Styled = styled.div`
  padding: 32px;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 8px;
  background-color: #fff;
  min-width: 440px;
  .title {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #374151;
    margin-bottom: 16px;
  }
  .desc {
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
    padding-bottom: 32px;
  }
  .btns {
    padding-top: 32px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
  }
`;
export default function StyledModal({
  title = "",
  description = "",
  buttons = null,
  children,
  ...props
}) {
  return (
    <Styled {...props}>
      {title && <h3 className="title">{title}</h3>}
      {description && <p className="desc">{description}</p>}
      {children}
      {buttons && <div className="btns">{buttons}</div>}
    </Styled>
  );
}
