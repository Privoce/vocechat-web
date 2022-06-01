import { useState } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import dropdownIcon from "../../../assets/icons/dropdown.svg?url";
import radioIcon from "../../../assets/icons/radio.svg?url";
import radioCheckedIcon from "../../../assets/icons/radio.checked.svg?url";
import { useDispatch } from "react-redux";
import { setDevice } from "../../../app/slices/videocall";

const Wrapper = styled.div`
 color: #475467;
 background: #ffffff;
 border: 1px solid #f2f4f7;
 box-shadow: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
 border-radius: 12px;
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 padding: 10px;
 hr {
  display: block;
  height: 1px;
  width: 100%;
  color: #f2f4f7;
  border-top: 1px solid #f2f4f7;
  margin-bottom: 13px;
 }
 .title {
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #1d2939;
 }
 .radioBox {
  display: flex;
  flex-direction: column;
  align-items: center;
 }
 .item {
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 8px;
  .radio {
   padding: 8px;
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 20px;
   color: #475467;
   width: 160px;
   height: 36px;
   text-align: left;
   overflow: hidden;
   white-space: nowrap;
  }
  .radio-icon {
   width: 20px;
   height: 20px;
  }
 }
`;
export function Device({
 type,
 inputs,
 outputs,
 currentInput,
 currentOutput,
 handleClick,
 client
}) {
 return (
  <Wrapper>
   <>
    {type == "camera" && (
     <>
      <div className="title">CAMERA</div>
      <div className="radioBox">
       {inputs.map((device) => {
        return (
         <div key={device.deviceId}>
          <div className="item">
           <div
            className="radio"
            onClick={() => {
             client.setDevice(device.deviceId, "camera");
             handleClick(device.deviceId, "camera");
            }}
           >
            {device.label}
           </div>
           <img
            src={device.deviceId == currentInput ? radioCheckedIcon : radioIcon}
            alt="radio"
            onClick={() => {
             client.setDevice(device.deviceId, "camera");
             handleClick(device.deviceId, "camera");
            }}
            className="radio-icon"
           />
          </div>
         </div>
        );
       })}
      </div>
     </>
    )}
    {type == "microphone" && (
     <>
      <div className="title">INPUT</div>
      <div className="radioBox">
       {inputs.map((device) => {
        return (
         <div key={device.deviceId}>
          <div className="item">
           <div
            className="radio"
            onClick={() => {
             client.setDevice(device.deviceId, "microphone");
             handleClick(device.deviceId, "microphone");
            }}
           >
            {device.label}
           </div>
           <img
            src={device.deviceId == currentInput ? radioCheckedIcon : radioIcon}
            alt="radio"
            className="radio-icon"
            onClick={() => {
             client.setDevice(device.deviceId, "microphone");
             handleClick(device.deviceId, "microphone");
            }}
           />
          </div>
         </div>
        );
       })}
      </div>
      <hr />
      <div className="title">OUTPUT</div>
      <div className="radioBox">
       {outputs.map((device) => {
        return (
         <div key={device.deviceId}>
          <div className="item">
           <div
            className="radio"
            onClick={() => {
             client.setDevice(device.deviceId, "playback");
             handleClick(device.deviceId, "playback");
            }}
           >
            {device.label}
           </div>
           <img
            src={device.deviceId == currentOutput ? radioCheckedIcon : radioIcon}
            onClick={() => {
             client.setDevice(device.deviceId, "playback");
             handleClick(device.deviceId, "playback");
            }}
            alt="radio"
            className="radio-icon"
           />
          </div>
         </div>
        );
       })}
      </div>
     </>
    )}
   </>
  </Wrapper>
 );
}
export default function DeviceSelector({
 type,
 inputs,
 outputs,
 currentInput,
 currentOutput,
 client
}) {
 const dispatch = useDispatch();
 const [visible, setVisible] = useState(false);
 const show = () => setVisible(true);
 const hide = () => setVisible(false);
 const handleClick = (e, type) => {
  hide();
  if (e != "default") {
   dispatch(setDevice({ deviceId: e, type }));
  }
 };

 return (
  <>
   <Tippy
    interactive
    visible={visible}
    onClickOutside={hide}
    content={
     <Device
      type={type}
      inputs={inputs}
      outputs={outputs}
      currentInput={currentInput}
      currentOutput={currentOutput}
      handleClick={handleClick}
      client={client}
     />
    }
   >
    <img onClick={visible ? hide : show} src={dropdownIcon} alt="arrow down" />
   </Tippy>
  </>
 );
}
