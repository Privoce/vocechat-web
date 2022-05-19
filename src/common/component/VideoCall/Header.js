import styled from "styled-components";
import FullScreenIcon from "../../../assets/icons/fullscreen.svg?url";
const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 width: 210px;
 height: 56px;
 flex: none;
 order: 0;
 flex-grow: 0;
 .actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 16px;

  width: 210px;
  height: 40px;
  flex: none;
  order: 0;
  flex-grow: 0;
 }
`;
export default function Header() {
 return (
  <Wrapper>
   <div className="actions">
    <img src={FullScreenIcon} className="icon" alt="fullscreen" />
   </div>
  </Wrapper>
 );
}
