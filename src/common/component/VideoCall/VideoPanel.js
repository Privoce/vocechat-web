import styled from "styled-components";
import Control from "./Control";
import Header from "./Header";
import User from "./User";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../app/slices/videocall";

import { useEffect, useState } from "react";

const Wrapper = styled.div`
 .videoPanel {
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* todo */
  width: 226px;
  height: calc(100vh - 56px - 22px);
  overflow-y: scroll;
  padding: 8px;
  box-shadow: inset 1px 0px 0px rgba(0, 0, 0, 0.1);
  .users {
   box-shadow: 0px -1px 0px 0px #0000000d;
   flex-grow: 1;
   overflow: auto;
  }
  .control {
   z-index: 1;
   background: #fff;
  }
 }
 .panel {
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* todo */
  width: 226px;
  height: calc(100vh - 56px - 22px);
  overflow-y: scroll;
  padding: 8px;
  box-shadow: inset 1px 0px 0px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: inset 1px 0px 0px rgba(0, 0, 0, 0.1);
  .label {
   width: 187px;
   height: 20px;

   /* Text sm/Semibold */

   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 20px;
   /* identical to box height, or 143% */

   /* gray/600 */

   color: #52525b;

   /* Inside auto layout */

   flex: none;
   order: 0;
   flex-grow: 0;
  }
 }
`;

export default function VideoPanel({ cid, client }) {
 const [showPanel, setShowPanel] = useState(false);
 const uid = useSelector((state) => state.authData.uid);
 const device = useSelector((state) => state.videocall.device);
 useEffect(() => {
  client.join(cid).then(setShowPanel(true));
  return async () => {
   await client.leave();
  };
 }, [client, uid, cid]);
 const users = useSelector(selectUsers);
 return (
  <Wrapper>
   {showPanel && (
    <div className="videoPanel">
     <Header />
     <div className="users">
      <User
       id={uid}
       openMic={device.mic}
       openVideo={device.camera}
       client={client}
       volume={device.volume}
      />
      {users.map((item) => {
       return (
        <User
         key={item.id}
         id={item.id}
         openMic={item.openMic}
         openVideo={item.openVideo}
         openShare={item.openShare}
         client={client}
         volume={item.volume}
        />
       );
      })}
     </div>
     <div className="control">
      <Control client={client} />
     </div>
    </div>
   )}
   {!showPanel && (
    <div className="panel">
     <div className="label">Connecting to voice room...</div>
    </div>
   )}
  </Wrapper>
 );
}
