import styled from 'styled-components';
import InviteIcon from '../../../assets/icons/invite.from.channel.svg?url';
import OrganizeIcon from '../../../assets/icons/organize.svg?url';
import videoIcon from '../../../assets/icons/video.svg?url';
import videoDisableIcon from '../../../assets/icons/video.disable.svg?url';
import chatCloseIcon from '../../../assets/icons/chat.close.svg?url';
import screenShareIcon from '../../../assets/icons/screen.share.svg?url';
import moreIcon from '../../../assets/icons/more.svg?url';
import micIcon from '../../../assets/icons/mic.on.svg?url';
import micOffIcon from '../../../assets/icons/mic.off.svg?url';
import fullScreenOffIcon from '../../../assets/icons/fullscreen.off.svg?url';
import openInNewWindowIcon from '../../../assets/icons/open.in.new.window.svg?url';
import ChannelIcon from '../ChannelIcon';
import Avatar from '../Avatar';
import { useState } from 'react';

// import micOffIcon from '../../../assets/icons/mic.off.svg?url';
const VideoChatPanelWrapper = styled.div`
 background: #000000;
 border-radius: 0px 16px 16px 0px;
 height: calc(100vh - 56px - 22px);
 color: #fff;
 font-family: Inter;
 .top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  .icons {
   display: flex;
   gap: 10px;
  }
  .text {
   display: flex;
   font-family: Inter;
   font-size: 14px;
   font-weight: 600;
   line-height: 20px;
   letter-spacing: 0em;
   text-align: left;
  }
 }
 .chatTwo {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .chatBox {
   width: 400px;
   height: 300px;
   display: block;
   border-radius: 8px;
   height: 300px;
   padding: 10px;
   background-color: #3f3f46;
   text-align: center;
   .avatar {
    width: 80px;
    height: 80px;
    border-radius: 80px;
   }
  }
 }
 .bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 16px;
  padding: 0px 10px;
  .button {
   background-color: #3f3f46;
   color: #fff;
   padding: 10px;
   border-radius: 5px;
   margin: 10px 5px;
   flex: 0 0 20%;
   text-align: center;
   min-width: 44px;
   min-height: 47px;
  }
 }
`;
export default function VideoChatPanel({ onOffFullScreen }) {
    const [openVideo, setOpenVideo] = useState(false);
    const [openMic, setOpenMic] = useState(false);

    return (
        <VideoChatPanelWrapper>
            <div className="top">
                <div className="text">
                    <ChannelIcon />
                    general
                </div>
                <div className="text">free mode</div>
                <div className="icons">
                    <img src={openInNewWindowIcon} className="icon" alt="invite icon" />
                    <img src={fullScreenOffIcon} className="icon" alt="invite icon" onClick={onOffFullScreen} />
                </div>
            </div>
            <div className="chatTwo">
                <div className="chatBox">
                    <Avatar className="avatar" />
                </div>
                <div className="chatBox">
                    <Avatar className="avatar" />
                </div>
            </div>
            <div className="bottom">
                <div>
                    <img src={InviteIcon} className="icon" alt="invite icon" />
                </div>
                <div style={{ display: 'flex' }}>
                    <button className="button" onClick={() => setOpenVideo(!openVideo)}>
                        <img src={openVideo ? videoIcon : videoDisableIcon} className="icon" alt="invite icon" />
                    </button>
                    <button className="button" onClick={() => setOpenMic(!openMic)}>
                        <img src={openMic ? micIcon : micOffIcon} className="icon" alt="invite icon" />
                    </button>
                    <button className="button">
                        <img src={screenShareIcon} className="icon" alt="invite icon" />
                    </button>
                    <button className="button">
                        {' '}
                        <img src={moreIcon} className="icon" alt="invite icon" />
                    </button>
                    <button className="button">
                        <img src={chatCloseIcon} className="icon" alt="invite icon" />
                    </button>
                </div>
                <div>
                    <img src={OrganizeIcon} className="icon" alt="organize icon" />
                </div>
            </div>
        </VideoChatPanelWrapper>
    );
}