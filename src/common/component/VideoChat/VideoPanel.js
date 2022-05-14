import styled from "styled-components";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import VideoCallListCell from "./VideoCallListCell";
import VideoControl from "./VideoControl";
import FullScreenIcon from "../../../assets/icons/fullscreen.svg?url";
import { useEffect, useState } from "react";
import {
  toggleChat,
  addUser,
  removeUser,
  selectUsers,
} from "../../../app/slices/videocall";
import ScreenSharing from "./ScreenShare";
import { useDispatch, useSelector } from "react-redux";
import Owner from "./Owner";
import JoinPanel from "./JoinPanel";
const VideoPanelWrapper = styled.div`
  display: flex;
  width: 226px;
  height: calc(100vh - 56px - 22px);
  flex-direction: column;
  .fullscreen {
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    flex-direction: row-reverse;
    padding: 10px;
  }
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

const config = { mode: "rtc", codec: "vp8" };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const appId = "020c861b44424b0eb0ff768ee9bffda2";

function UserList(users) {
  return users
    ? users.map((item) => {
        return (
          <VideoCallListCell
            key={item.uid}
            tracks={item.videoTrack}
            username={item.uid}
            showVideo={item.hasVideo}
          ></VideoCallListCell>
        );
      })
    : null;
}

export default function VideoPanel({ onFullScreen, channel }) {
  // const users = useSelector(selectUsers);
  const uid = useSelector((state) => state.authData.uid);
  const client = useClient();
  const [users, setUsers] = useState([]);
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const dispatch = useDispatch();

  useEffect(() => {
    // used for debugger
    window.agoraClient = client;
    // used for debugger
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log(
          "[agora] new user",
          user,
          mediaType,
          user.hasAudio,
          user.hasVideo
        );
        if (mediaType == "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType == "audio") {
          user.audioTrack?.play();
        }
      });
      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });
      client.on("user-joined", async (user) => {
        console.log("[agora]User Joined", user);
        if (user.hasVideo) {
          await client.subscribe(user, "video");
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (user.hasAudio) {
          await client.subscribe(user, "audio");
          user.audioTrack?.play();
        }
      });
      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
      await client.join(appId, name, null, uid);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
    };
    if (ready && tracks) {
      init(channel);
    }
  }, [channel, client, ready, tracks, uid]);
  return (
    <>
      {ready && (
        <VideoPanelWrapper>
          {/* <div className="fullscreen">
                    <img src={FullScreenIcon} className="icon" alt="fullscreen icon" onClick={onFullScreen} />
                </div> */}
          {/* for owner view */}
          {ready && tracks && <Owner track={tracks[1]} />}
          {/* other user list */}
          {UserList(users)}
          <VideoControl
            tracks={tracks}
            client={client}
            ScreenComponent={ScreenSharing}
            onScreenSharingStopped={() => console.log("[agora] stop")}
            onCloseChat={async () => {
              tracks[0].stop();
              tracks[0].close();
              tracks[1].stop();
              tracks[1].close();
              await client.leave();
              dispatch(toggleChat());
            }}
          />
        </VideoPanelWrapper>
      )}
      {!ready && <JoinPanel />}
    </>
  );
}
