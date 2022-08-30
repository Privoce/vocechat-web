// import React from "react";
import styled from "styled-components";
const Styled = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
  color: orange;
  padding: 50px;
  height: calc(100vh - 24px);
  text-transform: uppercase;
  letter-spacing: 2px;
`;
// type Props = {};

const OffTip = () => {
  return <Styled>Guest Mode Off</Styled>;
};

export default OffTip;
