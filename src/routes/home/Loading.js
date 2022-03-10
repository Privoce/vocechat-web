import { useState, useEffect } from "react";
import styled from "styled-components";
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
    width: 200px;
    height: 200px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    padding: 10px;
    border: 4px solid #999;
    border-radius: 50%;
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
    }, 10000);

    return () => {
      clearTimeout(inter);
    };
  }, []);

  return (
    <StyledWrapper>
      <div className="loading">Loading...</div>
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
