import styled from "styled-components";
import callEndIcon from "../../../assets/icons/call.end.svg?url";
import micOnIcon from "../../../assets/icons/mic.hightlight.svg?url";
import micOffIcon from "../../../assets/icons/mic.highlight.disabled.svg?url";
import videoOnIcon from "../../../assets/icons/video.highlight.svg?url";
import videoOffIcon from "../../../assets/icons/video.highlight.disable.svg?url";
import shareScreenIcon from "../../../assets/icons/sharescreen.svg?url";
import moreIcon from "../../../assets/icons/more.svg?url";
import DeviceSelector from "./DeviceSelector";
import { useSelector, useDispatch } from "react-redux";
import {
 selectDevice,
 selectDevices,
 toggleCamera,
 toggleMic,
 toggleShare,
 end
} from "../../../app/slices/videocall";

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
 const dispatch = useDispatch();
 const deviceState = useSelector(selectDevice);
 const { mics, cameras, playbacks } = useSelector(selectDevices);
 const { mic, camera, share, currentMic, currentCamera, currentPlayBack } = deviceState;
 return (
  <Wrapper>
   <div className="actions">
    <div className="button">
     <div className="dropdown">
      <DeviceSelector
       type="microphone"
       currentInput={currentMic}
       currentOutput={currentPlayBack}
       inputs={mics}
       outputs={playbacks}
      />
     </div>
     <div
      className="btn"
      onClick={() => {
       dispatch(toggleMic());
      }}
     >
      <img src={mic ? micOnIcon : micOffIcon} className="icon" alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div className="dropdown">
      <DeviceSelector type="camera" currentInput={currentCamera} inputs={cameras} />
     </div>
     <div
      className="btn"
      onClick={() => {
       dispatch(toggleCamera());
      }}
     >
      <img src={camera ? videoOnIcon : videoOffIcon} className="icon" alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div
      className="btn"
      onClick={() => {
       dispatch(toggleShare());
      }}
     >
      {/* TODO: 新增一个正在分享的 Icon */}
      <img src={share ? shareScreenIcon : shareScreenIcon} className="icon" alt="dropdown" />
     </div>
    </div>
    <div className="button">
     <div className="btn">
      <img src={moreIcon} className="icon" alt="dropdown" />
     </div>
    </div>
   </div>
   <div className="actions">
    <div
     className="disable"
     onClick={() => {
      dispatch(end());
     }}
    >
     <img src={callEndIcon} alt="disable" />
    </div>
   </div>
  </Wrapper>
 );
}
