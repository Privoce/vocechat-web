import { useEffect, useState } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import dropdownIcon from "../../../assets/icons/dropdown.svg?url";

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
 .title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #1d2939;
 }
 .radioBox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
 }
 .radio {
  padding: 8px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #475467;
  width: 281px;
  height: 36px;
  text-align: left;
 }
`;
export function Device({ type, devices, handleClick }) {
 return (
  <Wrapper>
   <div className="title">
    {type == "microphone" ? "Microphone".toUpperCase() : "Camera".toUpperCase()}
   </div>
   <div className="radioBox">
    {devices.map((device) => {
     return (
      <div key={device.deviceId} className="radio" onClick={() => handleClick(device.deviceId)}>
       {device.label}
      </div>
     );
    })}
   </div>
  </Wrapper>
 );
}
export default function DeviceSelector({ type }) {
 const [devices, setDevices] = useState([]);
 const [visible, setVisible] = useState(false);
 const show = () => setVisible(true);
 const hide = () => setVisible(false);
 useEffect(() => {
  async function init() {
   console.log(123);
   setDevices([]);
  }
  if (devices.length == 0) {
   init();
  }
 });
 const handleClick = (e) => {
  hide();
  if (e != "default") {
   console.log(123);
  }
 };

 return (
  <>
   <Tippy
    interactive
    visible={visible}
    onClickOutside={hide}
    content={<Device type={type} devices={devices} onClick={handleClick} />}
   >
    <img onClick={visible ? hide : show} src={dropdownIcon} alt="arrow down" />
   </Tippy>
  </>
 );
}
