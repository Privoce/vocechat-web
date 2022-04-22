// import React from 'react'
import styled from "styled-components";
const Styled = styled.div`
  background: #ecfdff;
  border-radius: 4px;
  height: 8px;
  overflow: hidden;
  .progress {
    transition: all 0.25s ease;
    height: 8px;
    background: #088ab2;
    border-radius: 4px;
  }
`;
export default function Progress({ value, width = "100%" }) {
  return (
    <Styled style={{ width }}>
      <div className="progress" style={{ width: `${value}%` }}></div>
    </Styled>
  );
}
