import { useRef, useState, useEffect } from 'react';
import { createScreenVideoTrack } from 'agora-rtc-react';

const getScreenSharingVideoTrack = (tracks) => {
    if (Array.isArray(tracks)) {
        return tracks[0];
    } else {
        return tracks;
    }
};

// ScreenSharing component
export default function ScreenSharing(props) {
    const useScreenVideoTrack = createScreenVideoTrack({
        encoderConfig: '1080p_1',
        optimizationMode: 'detail',
    });
    // Using the screen client hook
    const screenVideoClient = props.client;
    const { ready, tracks, error } = useScreenVideoTrack();
    const tracksRef = useRef(tracks);
    const [toggleState, setToggleState] = useState(false);

    const { onScreenSharingStopped } = props;

    useEffect(() => {
        tracksRef.current = tracks;
    }, [tracks]);

    useEffect(() => {
        if (error !== null) {
            console.error('An error occurred while sharing the screen.', error);
            onScreenSharingStopped();
        }
    }, [error, onScreenSharingStopped]);

    useEffect(() => {
        const init = async () => {

            try {
                const videoTrack = getScreenSharingVideoTrack(tracks);
                if (tracks) await screenVideoClient.publish(videoTrack);
            } catch (e) {
                console.error(e);
            }
        };

        init();

    }, [props, screenVideoClient, ready, tracks]);

    useEffect(() => {
        const videoTrack = getScreenSharingVideoTrack(tracks);
        if (videoTrack) {
            videoTrack.on('track-ended', () => {
                onScreenSharingStopped();
                stopScreenshare();
                setToggleState(false);
            });
        }
        // Stop and remove all tracks for screenshared client
        function stopScreenshare() {
            if (tracksRef.current) {
                const track = getScreenSharingVideoTrack(tracksRef.current);
                track.close();
                track.removeAllListeners();
            }; (async () => {
                // await screenVideoClient.leave();
                // screenVideoClient.removeAllListeners();
            })();
        }
    }, [onScreenSharingStopped, tracks, screenVideoClient]);

    useEffect(() => {
        return () => {
            if (tracksRef.current) {
                const track = getScreenSharingVideoTrack(tracksRef.current);
                track.close();
                track.removeAllListeners();
            }; (async () => {
                // await screenVideoClient.leave();
                // screenVideoClient.removeAllListeners();
            })();
        };
    }, [tracks, screenVideoClient]);

    if (!ready) {
        return null;
    }

    // Toggle tracks for screenshared client
    if (toggleState) {
        // If on then turn it off
        if (tracksRef.current) {
            const track = getScreenSharingVideoTrack(tracksRef.current);
            track.close();
            track.removeAllListeners();
        };
        (async () => {
            await screenVideoClient.leave();
            screenVideoClient.removeAllListeners();
        })();
    } else {
        // If off then turn it on
        (async () => {
            const videoTrack = getScreenSharingVideoTrack(tracks);
            if (tracks) await screenVideoClient.publish(videoTrack);
        })();
    }

    return (
        <>
            {/* Toggle Screenshare Button */}
            <div id="screenshare-controls">
                {/* <button onClick={() => setToggleState(!toggleState)} id="toggle-screenshare-btn">{toggleState ? ("Start Screen Sharing") : ("Stop Screen Sharing")}</button> */}
            </div>
        </>
    );
};