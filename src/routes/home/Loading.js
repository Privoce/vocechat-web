// import React from 'react'
import styled from "styled-components";
const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    padding: 10px;
    border: 4px solid #999;
    border-radius: 50%;
  }
`;
export default function Loading() {
  return (
    <StyledWrapper>
      <div className="loading">Loading...</div>
    </StyledWrapper>
  );
}
