// import React from "react";
import styled from "styled-components";
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-weight: 600;
    font-size: 30px;
    line-height: 38px;
    color: #101828;
    margin-bottom: 12px;
  }
  .desc {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
`;
export default function ExpiredTip() {
  return (
    <Styled>
      <div className="title">Magic link expired</div>
      <p className="desc">
        Go back to your original Rustchat tab and request a new magic link.
      </p>
      <p className="desc">You can close this window now.</p>
    </Styled>
  );
}
