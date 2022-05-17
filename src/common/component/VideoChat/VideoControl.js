import videoIcon from "../../../assets/icons/video.svg?url";
import videoDisableIcon from "../../../assets/icons/video.disable.svg?url";
import chatCloseIcon from "../../../assets/icons/chat.close.svg?url";
import screenShareIcon from "../../../assets/icons/screen.share.svg?url";
import Device from "./Device";
import moreIcon from "../../../assets/icons/more.svg?url";
import micIcon from "../../../assets/icons/mic.on.svg?url";
import micOffIcon from "../../../assets/icons/mic.off.svg?url";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleVideo, toggleAudio } from "../../../app/slices/videocall";
const VideoControlWrapper = styled.div`
  .controlGroup {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: absolute;
    bottom: 10px;
  }
  .button {
    background-color: #f4f4f5;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 5px;
    flex: 0 0 28%;
    text-align: center;
  }
  .magaButton {
    background-color: #d92d20;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 5px;
    flex: 0 0 90%;
    text-align: center;
  }
`;
export default function VideoControl({ tracks, ScreenComponent, onCloseChat }) {
  const openVideo = useSelector((state) => state.videoCall.trackState.video);
  const openAudio = useSelector((state) => state.videoCall.trackState.audio);
  const trackState = useSelector((state) => state.videoCall.trackState);
  const [openScreenShare, setOpenScreenShare] = useState(false);
  const dispatch = useDispatch();

  return (
    <VideoControlWrapper>
      <div className="controlGroup">
        <span className="button">
          <Device track={tracks[1]} type="camera" />
          <img
            onClick={() => {
              dispatch(toggleVideo());
              tracks[1].setMuted(!trackState.video);
            }}
            className="icon"
            src={openVideo ? videoIcon : videoDisableIcon}
          />
        </span>
        <span className="button">
          <Device track={tracks[0]} type="microphone" />
          <img
            className="icon"
            src={openAudio ? micIcon : micOffIcon}
            onClick={() => {
              dispatch(toggleAudio());
              tracks[0].setEnabled(!trackState.audio);
            }}
          />
        </span>

        {/* <span
          className="button"
          onClick={() => setOpenScreenShare(!openScreenShare)}
        >
          <img
            className="icon"
            src={openScreenShare ? screenShareIcon : screenShareIcon}
          />
        </span> */}
        <span className="button">
          <img className="icon" src={moreIcon} />
        </span>
        <span className="magaButton" onClick={() => onCloseChat()}>
          <img className="icon" src={chatCloseIcon} />
        </span>
        {openScreenShare && <ScreenComponent />}
      </div>
    </VideoControlWrapper>
  );
}
