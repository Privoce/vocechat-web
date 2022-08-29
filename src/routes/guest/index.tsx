// import React from 'react';
import { NavLink, useParams } from "react-router-dom";
import StyledWrapper from "./styled";
import Loading from "../../common/component/Loading";
import Manifest from "../../common/component/Manifest";
import Server from "../../common/component/Server";
import BlankPlaceholder from "./BlankPlaceholder";
import { useAppSelector } from "../../app/store";
import usePreload from "../../common/hook/usePreload";
import SessionList from "./SessionList";
import ChannelChat from "./ChannelChat";
// const routes = ["/setting", "/setting/channel/:cid"];
export default function GuestHomePage() {
  const { cid = 0 } = useParams();
  const placeholderVisible = cid == 0;
  const {
    ui: { ready }
  } = useAppSelector((store) => {
    return {
      ui: store.ui
    };
  });
  const { loading } = usePreload();
  if (loading || !ready) {
    return <Loading reload={true} fullscreen={true} />;
  }

  return (
    <>
      <Manifest />
      <StyledWrapper>
        <div className="left">
          <Server readonly />
          <SessionList />
        </div>
        <div className={`right ${placeholderVisible ? "placeholder" : ""}`}>
          {placeholderVisible && <BlankPlaceholder />}
          {cid !== 0 && <ChannelChat cid={+cid} />}
        </div>
      </StyledWrapper>
    </>
  );
}

// import Server from "../../common/component/Server";
// import ChannelChat from "./ChannelChat";
// import SessionList from "./SessionList";
// export default function ChatPage() {
//   const { channel_id = 0 } = useParams();
//   const placeholderVisible = channel_id == 0 ;
//   return (
//     <>
//       <StyledWrapper>
//         <div className="left">
//           <Server />
//           <SessionList tempSession={tmpSession} />
//         </div>
//         <div className={`right ${placeholderVisible ? "placeholder" : ""}`}>
//           {placeholderVisible && <BlankPlaceholder />}
//           {channel_id !== 0 && <ChannelChat cid={+channel_id} />}
//         </div>
//       </StyledWrapper>
//     </>
//   );
// }
