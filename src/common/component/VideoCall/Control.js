import styled from "styled-components";
import callEndIcon from "../../../assets/icons/call.end.svg?url";
import dropdownIcon from "../../../assets/icons/dropdown.svg?url";
import micOnIcon from "../../../assets/icons/mic.hightlight.svg?url";
// import micOff from "../../../assets/icons/mic.hightlight.disabled.svg?url";
import videoOnIcon from "../../../assets/icons/video.hightlight.svg?url";
// import videoOff from "../../../assets/icons/video.hightlight.disabled.svg?url";
import shareScreenIcon from "../../../assets/icons/share.screen.svg?url";
import moreIcon from "../../../assets/icons/more.svg?url";

const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 0px;
 gap: 8px;

 width: 210px;
 height: 88px;

 flex: none;
 order: 0;
 flex-grow: 0;
 .icon {
  width: 24px;
  height: 24px;
 }
 .actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 82px;

  width: 210px;
  height: 40px;

  flex: none;
  order: 0;
  flex-grow: 0;
  .button {
   width: 48px;
   height: 40px;
   flex: none;
   order: 0;
   flex-grow: 0;
   .dropdown {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 2px;

    position: absolute;
    left: 66.67%;
    right: 0%;
    top: 0%;
    bottom: 70%;

    border-radius: 0px 8px 0px 0px;
   }
   .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    gap: 4px;

    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #f4f4f5;
    border-radius: 8px;
   }
  }
  .disable {
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   padding: 8px 12px;
   gap: 4px;

   width: 210px;
   height: 40px;
   background: #d92d20;
   border-radius: 8px;
   flex: none;
   order: 0;
   flex-grow: 0;
  }
 }
`;
export default function Control() {
 return (
  <Wrapper>
   <div className="actions">
    <div className="button">
     <div className="dropdown">
      <img src={dropdownIcon} alt="dropdown" />
     </div>
     <div className="btn">
      <img src={micOnIcon} alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div className="dropdown">
      <img src={dropdownIcon} alt="dropdown" />
     </div>
     <div className="btn">
      <img src={videoOnIcon} alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div className="btn">
      <img src={shareScreenIcon} alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div className="btn">
      <img src={moreIcon} alt="dropdown" />
     </div>
    </div>
   </div>
   <div className="actions">
    <div className="disabled">
     <img src={callEndIcon} alt="disable" />
    </div>
   </div>
  </Wrapper>
 );
}
