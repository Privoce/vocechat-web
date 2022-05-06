import {
    AgoraVideoPlayer
} from "agora-rtc-react";
export default function Owner({ track }) {
    return (<div>
        <div className="video">
            <AgoraVideoPlayer videoTrack={track} style={{ height: '180px', width: '100%' }} />
        </div>
    </div>);
}