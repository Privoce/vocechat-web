/* eslint-disable no-undef */
import { Outlet } from "react-router-dom";
import StyledWrapper from "./styled";

export default function Reg() {
  return (
    <StyledWrapper>
      <div className="form">
        <Outlet />
      </div>
    </StyledWrapper>
  );
}
