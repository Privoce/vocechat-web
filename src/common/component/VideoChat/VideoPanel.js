import styled from 'styled-components';
import {
    createClient,
    createMicrophoneAndCameraTracks,
    AgoraVideoPlayer
} from "agora-rtc-react";
import VideoCallListCell from '../VideoCallListCell';
import VideoControl from '../VideoControl';
import FullScreenIcon from '../../../assets/icons/fullscreen.svg?url';
import { useEffect, useState } from 'react';
import { addUser, removeUser, selectUsers } from '../../../app/slices/videocall';
import { useDispatch, useSelector } from 'react-redux';
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

export const StyledJoiningChat = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-content: center;
 align-items: center;
 width: 226px;
 height: calc(100vh - 56px - 22px);
 .title {
  font-size: 16px;
  line-height: 24px;
  color: #1c1c1e;
  font-weight: 600;
 }
`;

const config = { mode: "rtc", codec: "vp8" };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();


const appId = "020c861b44424b0eb0ff768ee9bffda2";


export default function VideoPanel({ onFullScreen }) {
    // const users = useSelector(selectUsers);
    const uid = useSelector((state) => state.authData.uid);
    const client = useClient();
    const [users, setUsers] = useState([]);
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    useEffect(() => {
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) => {
                console.log("[agora]", users);
                await client.subscribe(user, mediaType);
                setUsers((prevUsers) => {
                    return [...prevUsers, user];
                });
                console.log("[agora]-done", users, users.length);
            });
            client.on("user-left", (user) => {
                console.log("[agora]", "leaving", user);
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });
            await client.join(appId, name, null, uid);
            if (tracks) await client.publish([tracks[0], tracks[1]]);
        };
        if (ready && tracks) {
            console.log("init ready");
            init("123213");
        }
    }, [ready, tracks]);
    const List = users.map(item => {
        return <VideoCallListCell key={item.uid} tracks={item.videoTrack} username={item.uid} showVideo={true}  ></VideoCallListCell>;
    });
    console.log("[agora] list", List, List.length);
    return (
        <>
            {ready && (<VideoPanelWrapper>
                {/* <div className="fullscreen">
                    <img src={FullScreenIcon} className="icon" alt="fullscreen icon" onClick={onFullScreen} />
                </div> */}
                {ready && tracks &&
                    <div>
                        <div className="video">
                            <AgoraVideoPlayer videoTrack={tracks[1]} style={{ height: '180px', width: '100%' }} />
                        </div>
                    </div>}
                {List}
                <VideoControl tracks={tracks} />
            </VideoPanelWrapper>)}
            {!ready && <JoinPanel />}
        </>
    );
}

function JoinPanel() {
    return (
        <>
            <StyledJoiningChat>
                <div>Connecting to voice room...</div>
            </StyledJoiningChat>
        </>
    );
}