import styled from "styled-components";
import Control from "./Control";
import Header from "./Header";
import User from "./User";

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
 return (
  <Wrapper>
   <Header />
   <div className="users">
    {["Ding Yi", "Helper", "Helper1", "Helper2", "Helper3", "Helper4", "Helper5", "Helper6"].map(
     (item) => {
      return (
       <User
        key={item}
        id={item}
        openMic={Math.random() * 10 > 1}
        openVideo={Math.random() * 10 > 1}
       />
      );
     }
    )}
   </div>
   <div className="control">
    <Control />
   </div>
  </Wrapper>
 );
}
