// import React from "react";
import styled from "styled-components";
import { useGetServerVersionQuery } from "../../app/services/server";
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export default function FAQ() {
  const { data: serverVersion } = useGetServerVersionQuery();
  console.log("build time", serverVersion);
  return (
    <Styled>
      <div className="item">Client Version: {process.env.VERSION}</div>
      <div className="item">Server Version: {serverVersion}</div>
      <div className="item">Build Timestamp: {process.env.REACT_APP_BUILD_TIME}</div>
    </Styled>
  );
}
