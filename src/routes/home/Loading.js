import { useState, useEffect } from "react";
import styled from "styled-components";
import { Ring } from "@uiball/loaders";

import Button from "../../common/component/styled/Button";
import useLogout from "../../common/hook/useLogout";

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
    visibility: hidden;
    &.visible {
      visibility: visible;
    }
  }
`;
export default function Loading() {
  const [reloadVisible, setReloadVisible] = useState(false);
  const { clearLocalData } = useLogout();
  const handleReload = () => {
    clearLocalData();
    location.reload(true);
  };
  useEffect(() => {
    const inter = setTimeout(() => {
      setReloadVisible(true);
    }, 30000);

    return () => {
      clearTimeout(inter);
    };
  }, []);

  return (
    <StyledWrapper>
      <Ring
        className="loading"
        size={40}
        lineWeight={5}
        speed={2}
        color="black"
      />
      {reloadVisible && (
        <Button
          className={`reload danger ${reloadVisible ? "visible" : ""}`}
          onClick={handleReload}
        >
          Reload
        </Button>
      )}
    </StyledWrapper>
  );
}
