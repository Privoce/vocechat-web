import styled from "styled-components";
import Avatar from "../Avatar";
import MicOnIcon from "../../../assets/icons/mic.on.svg?url";
import MicDisabledIcon from "../../../assets/icons/mic.disabled.svg?url";
import soundOnIcon from "../../../assets/icons/sound.on.svg?url";
import soundOffIcon from "../../../assets/icons/sound.off.svg?url";
import micRedIcon from "../../../assets/icons/mic.red.svg?url";
import { useSelector } from "react-redux";
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
    font-family: "Inter";
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
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px;
    gap: 4px;
    width: 83px;
    height: 18px;
    left: 0px;
    bottom: 18px;
    border-bottom-left-radius: 4px;

    background: #0a0a0a;
    .icon {
     width: 13px;
     height: 13px;
     flex: none;
     order: 0;
     flex-grow: 0;
    }
    .label {
     width: 62px;
     height: 14px;

     font-family: "SF Pro Text";
     font-style: normal;
     font-weight: 500;
     font-size: 11.5px;
     line-height: 14px;
     letter-spacing: -0.04em;
     color: #ffffff;
     flex: none;
     order: 1;
     flex-grow: 0;
     overflow: hidden;
    }
   }
  }
 }
`;
export default function User({ id, openMic, openVideo }) {
 const byId = useSelector((state) => state.contacts.byId);
 const user = byId[id];
 return (
  <Wrapper>
   {openVideo && (
    <div className="video">
     <div className="player">
      <div className="agora-player"></div>
      <div className="name-tag">
       <img src={micRedIcon} alt="mic close icon" className="icon" />
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
