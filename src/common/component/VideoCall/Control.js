import styled from "styled-components";
import callEndIcon from "../../../assets/icons/call.end.svg?url";
import micOnIcon from "../../../assets/icons/mic.hightlight.svg?url";
// import micOff from "../../../assets/icons/mic.hightlight.disabled.svg?url";
import videoOnIcon from "../../../assets/icons/video.highlight.svg?url";
// import videoOff from "../../../assets/icons/video.hightlight.disabled.svg?url";
import shareScreenIcon from "../../../assets/icons/sharescreen.svg?url";
import moreIcon from "../../../assets/icons/more.svg?url";
import DeviceSelector from "./DeviceSelector";

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
  width: 210px;
  height: 40px;

  flex: none;
  order: 0;
  flex-grow: 0;
  .dropdown {
   position: absolute;
   width: 8px;
   height: 4.75px;
   left: calc(76% - 8px / 2);
   top: calc(5% - 4.75px / 2 + 0.62px);
  }
  .button {
   position: relative;
   width: 48px;
   height: 40px;
   flex: none;
   order: 0;
   flex-grow: 0;
   .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    gap: 4px;

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
   background: #d92d20;
   border-radius: 8px;

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
      <DeviceSelector type="microphone" />
     </div>
     <div className="btn">
      <img src={micOnIcon} className="icon" alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div className="dropdown">
      <DeviceSelector type="camera" />
     </div>
     <div className="btn">
      <img src={videoOnIcon} className="icon" alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div className="btn">
      <img src={shareScreenIcon} className="icon" alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div className="btn">
      <img src={moreIcon} className="icon" alt="dropdown" />
     </div>
    </div>
   </div>
   <div className="actions">
    <div className="disable">
     <img src={callEndIcon} alt="disable" />
    </div>
   </div>
  </Wrapper>
 );
}
