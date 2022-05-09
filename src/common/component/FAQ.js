// import React from "react";
import styled from "styled-components";
import pkg from "../../../package.json";

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export default function FAQ() {
  console.log("build time", process.env);
  return (
    <Styled>
      <div className="item">
        Build Timestamp: {process.env.REACT_APP_BUILD_TIME}
      </div>
      <div className="item">Version: {pkg.version}</div>
    </Styled>
  );
}
