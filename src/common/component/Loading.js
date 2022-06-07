// import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Ring } from "@uiball/loaders";

import Button from "./styled/Button";
import useLogout from "../hook/useLogout";
const DelayVisible = keyframes`
from{
opacity: 0;
}
to{
opacity: 1;
}
`;
const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reload {
    opacity: 0;
    &.visible {
      animation: ${DelayVisible} 1s forwards;
      animation-delay: 30s;
    }
  }
`;
export default function Loading({ reload = false }) {
  const { clearLocalData } = useLogout();
  const handleReload = () => {
    clearLocalData();
    location.reload(true);
  };
  return (
    <StyledWrapper>
      <Ring
        className="loading"
        size={40}
        lineWeight={5}
        speed={2}
        color="black"
      />
      <Button
        className={`reload danger ${reload ? "visible" : ""}`}
        onClick={handleReload}
      >
        Reload
      </Button>
    </StyledWrapper>
  );
}
