import styled from "styled-components";
import Avatar from "../Avatar";
import MicOnIcon from "../../../assets/icons/mic.on.svg?url";
import MicDisabledIcon from "../../../assets/icons/mic.disabled.svg?url";
import soundOnIcon from "../../../assets/icons/sound.on.svg?url";
import soundOffIcon from "../../../assets/icons/sound.off.svg?url";
import micRedOffIcon from "../../../assets/icons/mic.red.svg?url";
import micRedOnIcon from "../../../assets/icons/mic.red.on.svg?url";
import { useSelector } from "react-redux";
import AgoraVideoPlayer from "./VideoPlayer";
const Wrapper = styled.div`
 .no-video {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 2px;

  width: 210px;
  height: 64px;

  background: #ffffff;
  //  box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.05);

  justify-content: center;
  flex: none;
  order: 1;
  flex-grow: 0;
  .people {
   width: 130px;
   height: 32px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   gap: 8px;
   flex: none;
   order: 0;
   flex-grow: 0;
   .avatar {
    width: 32px;
    height: 32px;
    border-radius: 16px;
   }
   .name {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
   }
  }
  .actions {
   display: flex;
   flex-direction: row;
   align-items: flex-start;
   padding: 0px;
   gap: 8px;
   width: 40px;
   height: 16px;
   flex: none;
   order: 1;
   flex-grow: 0;
   .icon {
    width: 16px;
    height: 16px;
   }
  }
 }
 .video {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 8px;

  width: 210px;
  height: 126px;

  border-radius: 8px;

  flex: none;
  order: 1;
  flex-grow: 0;
  .player {
   width: 194px;
   height: 110px;
   border-radius: 8px;

   flex: none;
   order: 0;
   flex-grow: 0;
   .agora-player {
    position: relative;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    background: #f3f3f3;
    height: 110px;
    width: 194px;
    border-radius: 4px;
   }
   .name-tag {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    gap: 4px;

    width: 78px;
    height: 28px;

    /* base / black 50% */

    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    position: relative;
    top: -36px;
    left: 8px;
    .icon {
     width: 13px;
     height: 13px;
     flex: none;
     order: 0;
     flex-grow: 0;
    }
    .label {
     width: 42px;
     height: 20px;

     font-style: normal;
     font-weight: 600;
     font-size: 14px;
     line-height: 20px;
     /* identical to box height, or 143% */

     /* Gray iron / 300 */

     color: #d1d1d6;

     /* Inside auto layout */

     flex: none;
     order: 1;
     flex-grow: 0;
     overflow: hidden;
    }
   }
  }
 }
`;
export default function User({ id, openMic, openVideo, client }) {
 const byId = useSelector((state) => state.contacts.byId);
 const user = byId[id];
 const userWithTrack = client.getUserById(id);
 return (
  <Wrapper>
   {openVideo && (
    <div className="video">
     <div className="player">
      <AgoraVideoPlayer className="agora-player" videoTrack={userWithTrack?.videoTrack} />
      <div className="name-tag">
       <img src={openMic ? micRedOnIcon : micRedOffIcon} alt="mic close icon" className="icon" />
       <span className="label">{user.name}</span>
      </div>
     </div>
    </div>
   )}
   {!openVideo && (
    <div className="no-video">
     <div className="people">
      <Avatar className="avatar" name={user.name} url={user.avatar != "" ? user.avatar : null} />
      <div className="name">{user.name}</div>
     </div>
     <div className="actions">
      <img src={openMic ? MicOnIcon : MicDisabledIcon} className="icon" alt="mic control" />
      <img src={openVideo ? soundOnIcon : soundOffIcon} className="icon" alt="mic control" />
     </div>
    </div>
   )}
  </Wrapper>
 );
}
