import { AgoraVideoPlayer } from "agora-rtc-react";
import styled from "styled-components";
const Cell = styled.div`
  display: block;
  width: 100%;
  .video {
    width: 226px;
    padding: 5px;
    overflow: hidden;
  }
  .nameTag {
    display: inline-block;
    position: relative;
    z-index: 0;
    background-color: #000;
    color: #fff;
    padding: 3px 5px;
    top: -22px;
  }
`;
export default function Owner({ track }) {
  return (
    <Cell>
      <div className="video">
        <AgoraVideoPlayer
          videoTrack={track}
          style={{ height: "180px", width: "100%" }}
        />
        <div className="nameTag">当前用户</div>
      </div>
    </Cell>
  );
}
