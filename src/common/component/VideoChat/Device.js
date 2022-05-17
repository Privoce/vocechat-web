import { useEffect, useState } from "react";
import styled from "styled-components";
import AgoraRTC from "agora-rtc-react";
import Tippy from "@tippyjs/react";
import DeviceSelector from "./DeviceSelector";
import ArrowDownIcon from "../../../assets/icons/arrow.down.svg?url";
function getDeviceByType(type) {
  if (type == "camera") {
    return AgoraRTC.getCameras();
  }
  if (type == "microphone") {
    return AgoraRTC.getMicrophones();
  }
  if (type == "playback") {
    return AgoraRTC.getPlaybackDevices();
  }
}
const Wrapper = styled.div`
  position: relative;
  top: -5px;
  left: 10px;
`;

export default function Device({ track, type }) {
  const [devices, setDevices] = useState([]);
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  useEffect(() => {
    async function init() {
      const fetchDevices = await getDeviceByType(type);
      setDevices(fetchDevices);
    }
    if (devices.length == 0) {
      init();
    }
  });
  const handleClick = (e) => {
    hide();
    if (e != "default") {
      track.setDevice(e);
    }
  };

  return (
    <Wrapper>
      <Tippy
        interactive
        visible={visible}
        onClickOutside={hide}
        content={
          <DeviceSelector
            type={type}
            devices={devices}
            handleClick={handleClick}
          />
        }
      >
        <img
          onClick={visible ? hide : show}
          src={ArrowDownIcon}
          alt="arrow down"
        />
      </Tippy>
    </Wrapper>
  );
}
