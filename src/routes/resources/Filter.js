// import React from "react";
import styled from "styled-components";
const Styled = styled.div`
  /* padding: 20px 0; */
  display: flex;
  align-items: center;
  gap: 8px;
  .filter {
  }
`;

export default function Filter() {
  return (
    <Styled>
      <div className="filter">filter item</div>
    </Styled>
  );
}
