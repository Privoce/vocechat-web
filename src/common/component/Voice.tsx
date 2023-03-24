import AgoraRTC from 'agora-rtc-sdk-ng';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAgoraConfigQuery, useGetAgoraVoicingListQuery, useLazyGetAgoraTokenQuery } from '../../app/services/server';
import { addVoiceMember, removeVoiceMember, updateJoinStatus, updateVoiceInfo } from '../../app/slices/voice';
import { useAppSelector } from '../../app/store';

// type Props = {}
window.VOICE_TRACK_MAP = window.VOICE_TRACK_MAP ?? {};
const Voice = () => {
    const isAdmin = useAppSelector(store => store.authData.user?.is_admin);
    const { data: agoraConfig } = useGetAgoraConfigQuery(undefined, {
        skip: !isAdmin
    });
    useGetAgoraVoicingListQuery({
        appid: agoraConfig?.app_id ?? "",
        key: agoraConfig?.rtm_key ?? "",
        secret: agoraConfig?.rtm_secret ?? "",

    }, {
        skip: !isAdmin || !agoraConfig,
        pollingInterval: 5000
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeAgoraClient = async () => {
            // Create an instance of the Agora Engine
            const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
            agoraEngine.on("user-published", async (user, mediaType) => {
                // Subscribe to the remote user when the SDK triggers the "user-published" event.
                await agoraEngine.subscribe(user, mediaType);
                dispatch(addVoiceMember(+user.uid));
                // console.log("subscribe success");
                // Subscribe and play the remote audio track.
                if (mediaType == "audio") {
                    // Play the remote audio track. 
                    user.audioTrack?.play();
                    window.VOICE_TRACK_MAP[+user.uid] = user.audioTrack;
                    // console.log("Remote user connected: " + user.uid);
                }
                // Listen for the "user-unpublished" event.
                agoraEngine.on("user-unpublished", user => {
                    dispatch(removeVoiceMember(+user.uid as number));
                    console.log(user.uid + "has left the channel");
                    // console.log("Remote user has left the channel");
                });
            });
            window.VOICE_CLIENT = agoraEngine;
        };
        if (!window.VOICE_CLIENT) {
            initializeAgoraClient();

        }

        return () => {
            if (window.VOICE_CLIENT) {
                window.VOICE_CLIENT.leave();
            }
            // window.VOICE_CLIENT=null
        };
    }, []);


    return null;
};
type VoiceProps = {
    id: number,
    context?: "channel" | "dm"
}
const useVoice = ({ id, context = "channel" }: VoiceProps) => {
    const dispatch = useDispatch();
    const { voiceInfo, joined } = useAppSelector(store => {
        return {
            voiceInfo: store.voice.voicing,
            joined: store.voice.joined
        };
    });
    const [generateToken] = useLazyGetAgoraTokenQuery();
    const [joining, setJoining] = useState(false);
    const joinVoice = async () => {
        setJoining(true);
        const { isError, data } = await generateToken(id);
        if (!isError && data) {
            const { channel_name, app_id, agora_token, uid } = data;
            if (window.VOICE_CLIENT) {
                await window.VOICE_CLIENT.join(app_id, channel_name, agora_token, uid);
                console.table(data);
                // Create a local audio track from the microphone audio.
                const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                // Publish the local audio track in the channel.
                await window.VOICE_CLIENT.publish(localAudioTrack);
                console.log("Publish success!");
                dispatch(updateVoiceInfo({
                    id,
                    context,
                    members: [uid]
                }));
                dispatch(updateJoinStatus(true));
            }
        }
        setJoining(false);
    };
    const leave = async () => {
        if (window.VOICE_CLIENT) {
            await window.VOICE_CLIENT.leave();
            dispatch(updateJoinStatus(false));
            // window.VOICE_TRACK_MAP
        }
    };
    return {
        leave,
        // canVoice,
        voiceInfo,
        joining,
        joined,
        joinVoice
    };
};
export { useVoice };
export default Voice;