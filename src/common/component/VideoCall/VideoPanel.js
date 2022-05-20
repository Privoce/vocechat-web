import styled from "styled-components";
import Control from "./Control";
import Header from "./Header";
import User from "./User";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../app/slices/videocall";

const Wrapper = styled.div`
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
`;

export default function VideoPanel() {
 const users = useSelector(selectUsers);
 return (
  <Wrapper>
   <Header />
   <div className="users">
    {users.map((item) => {
     return <User key={item.id} id={item.id} openMic={item.openMic} openVideo={item.openVideo} />;
    })}
   </div>
   <div className="control">
    <Control />
   </div>
  </Wrapper>
 );
}
