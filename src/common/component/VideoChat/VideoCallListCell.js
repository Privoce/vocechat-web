import styled from "styled-components";
import Avatar from "../Avatar";
import VideoIcon from "../../../assets/icons/video.svg";
import MicOnIcon from "../../../assets/icons/mic.on.svg";
import MicMuteIcon from "../../../assets/icons/speaker.mute.svg";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { useSelector } from "react-redux";

const Cell = styled.div`
  display: block;
  width: 100%;
  line-height: 25px;
  .line {
    margin: 10px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
  }
  .avatarBox {
    display: flex;
  }
  .avatar {
    width: 25px;
    height: 25px;
    border-radius: 25px;
    margin-right: 5px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .video {
    width: 226px;
    padding: 10px;
    overflow: hidden;
    border-radius: 20px;
  }
  .nameTag {
    display: inline-block;
    position: relative;
    z-index: 90;
    background-color: #000;
    color: #fff;
    maring-top: -20px;
    padding: 3px 5px;
    top: -40px;
  }
`;
export default function VideoCallListCell({
  username,
  avatar,
  // videoDiv,
  // openVoice = false,
  // openVideo = false,
  showVideo = false,
  track,
}) {
  const contactsById = useSelector((state) => state.contacts.byId);
  if (!username) return null;
  avatar = contactsById[username].avatar;
  console.log("[agora]username", username, contactsById[username].name);
  console.log("[agora]track", track);
  return (
    <Cell>
      {!(showVideo && track) && (
        <div className="line">
          <div className="avatarBox">
            <Avatar
              className="avatar"
              url={avatar ? avatar : "https://www.gravatar.com/avatar/demo"}
              name={
                contactsById[username].name
                  ? contactsById[username].name
                  : username
              }
              type="user"
            />
            {username}
          </div>
          <div>
            <VideoIcon className="icon" />
            <MicOnIcon className="icon" />
            <MicMuteIcon className="icon" />
          </div>
        </div>
      )}
      {showVideo && track && (
        <div>
          <div className="video">
            <AgoraVideoPlayer
              videoTrack={track}
              style={{ height: "180px", width: "100%" }}
            />
            <div className="nameTag">
              {" "}
              <MicOnIcon style={{ height: "15px", width: "25px" }} />
              {username}
            </div>
          </div>
        </div>
      )}
    </Cell>
  );
}
