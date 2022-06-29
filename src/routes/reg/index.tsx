import { Outlet } from "react-router-dom";
import StyledWrapper from "./styled";

export default function RegContainer() {
  return (
    <StyledWrapper>
      <div className="form">
        <Outlet />
      </div>
    </StyledWrapper>
  );
}
