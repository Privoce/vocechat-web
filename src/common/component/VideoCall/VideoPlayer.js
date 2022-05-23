import { useRef, useEffect } from "react";
export default function AgoraVideoPlayer(props) {
 const vidDiv = useRef(null);
 const { videoTrack, config, ...other } = props;
 useEffect(() => {
  if (vidDiv.current !== null && videoTrack !== null) videoTrack?.play(vidDiv.current, config);
  return () => {
   videoTrack?.stop();
  };
 }, [config, videoTrack]);

 return <div {...other} ref={vidDiv} />;
}
