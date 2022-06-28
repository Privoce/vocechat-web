import { Outlet } from "react-router-dom";
import StyledWrapper from "./styled";

export default function RegContainer() {
  // const isRegHome = useMatch(`/register`);

  return (
    <StyledWrapper>
      <div className="form">
        <Outlet />
      </div>
    </StyledWrapper>
  );
}
