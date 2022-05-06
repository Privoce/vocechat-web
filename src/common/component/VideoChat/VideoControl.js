import videoIcon from '../../../assets/icons/video.svg?url';
import videoDisableIcon from '../../../assets/icons/video.disable.svg?url';
import chatCloseIcon from '../../../assets/icons/chat.close.svg?url';
import screenShareIcon from '../../../assets/icons/screen.share.svg?url';
import moreIcon from '../../../assets/icons/more.svg?url';
import micIcon from '../../../assets/icons/mic.on.svg?url';
import micOffIcon from '../../../assets/icons/mic.off.svg?url';
import styled from 'styled-components';
import { useState } from 'react';
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
  flex: 0 0 20%;
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
export default function VideoControl({ tracks }) {
    const [openVideo, setOpenVideo] = useState(true);
    const [openMic, setOpenMic] = useState(true);
    const [openScreenShare, setOpenScreenShare] = useState(false);

    return (
        <VideoControlWrapper>
            <div className="controlGroup">
                <span className="button">
                    <img
                        className="icon"
                        onClick={() => {
                            setOpenVideo(!openVideo);
                            tracks[1].setEnabled(!openVideo);
                        }}
                        src={openVideo ? videoIcon : videoDisableIcon}
                    />
                </span>
                <span className="button">
                    <img
                        className="icon"
                        onClick={() => {
                            setOpenMic(!openMic);
                            tracks[0].setEnabled(!openMic);
                        }}
                        src={openMic ? micIcon : micOffIcon}
                    />
                </span>

                <span className="button">
                    {/* TODO: ScreenShare Disable Icon */}
                    <img
                        className="icon"
                        onClick={() => setOpenScreenShare(!openScreenShare)}
                        src={openScreenShare ? screenShareIcon : screenShareIcon}
                    />
                </span>
                <span className="button">
                    <img className="icon" src={moreIcon} />
                </span>
                <span className="magaButton">
                    <img className="icon" src={chatCloseIcon} />
                </span>
            </div>
        </VideoControlWrapper>
    );
}