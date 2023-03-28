import AgoraRTC, { IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAgoraConfigQuery, useGetAgoraVoicingListQuery, useLazyGetAgoraTokenQuery } from '../../app/services/server';
import { addVoiceMember, removeVoiceMember, updateMuteStatus, updateVoicingInfo, updateVoicingNetworkQuality } from '../../app/slices/voice';
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
                // Subscribe and play the remote audio track.
                console.log(user, " has published at the channel");
                if (mediaType == "audio") {
                    // Play the remote audio track. 
                    user.audioTrack?.play();
                    window.VOICE_TRACK_MAP[+user.uid] = user.audioTrack;
                }
                // Listen for the "user-unpublished" event.
                agoraEngine.on("user-unpublished", user => {
                    dispatch(removeVoiceMember(+user.uid as number));
                    console.log(user.uid + "has left the channel");
                });
                // 信号强度
                agoraEngine.on("network-quality", (qlt) => {
                    const { downlinkNetworkQuality } = qlt;
                    dispatch(updateVoicingNetworkQuality(downlinkNetworkQuality));
                });
                // 用户状态变化
                agoraEngine.on("user-info-updated", (uid, msg) => {
                    console.log("user-info-updated", uid, msg);
                    switch (msg) {
                        case "mute-audio":
                            // todo
                            break;
                        case "unmute-audio":
                            // todo
                            break;

                        default:
                            break;
                    }
                    // const { downlinkNetworkQuality } = qlt;
                    // dispatch(updateVoicingNetworkQuality(downlinkNetworkQuality));
                });
            });
            // 有新用户加入
            agoraEngine.on("user-joined", async (user) => {
                console.log(user, " has joined the channel");
                dispatch(addVoiceMember(+user.uid));
            });
            window.VOICE_CLIENT = agoraEngine;
        };
        if (!window.VOICE_CLIENT) {
            initializeAgoraClient();

        }

        return () => {
            if (window.VOICE_CLIENT && localTrack) {
                localTrack.close();
                window.VOICE_CLIENT.leave();
            }
            // window.VOICE_CLIENT=null
        };
    }, []);


    return null;
};
let localTrack: IMicrophoneAudioTrack | null = null;
type VoiceProps = {
    id: number,
    context?: "channel" | "dm"
}
const useVoice = ({ id, context = "channel" }: VoiceProps) => {
    const dispatch = useDispatch();
    const { voicingInfo } = useAppSelector(store => {
        return {
            // loginUid: store.authData.user?.uid,
            voicingInfo: store.voice.voicing
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
                localTrack = await AgoraRTC.createMicrophoneAudioTrack();
                // Publish the local audio track in the channel.
                await window.VOICE_CLIENT.publish(localTrack);
                console.log("Publish success!,joined the channel");

                dispatch(updateVoicingInfo({
                    muted: false,
                    id,
                    context,
                    members: [uid]
                }));
            }
        }
        setJoining(false);
    };
    const leave = async () => {
        if (window.VOICE_CLIENT && localTrack) {
            localTrack.close();
            await window.VOICE_CLIENT.leave();
            dispatch(updateVoicingInfo(null));
        }
    };
    const setMute = (mute: boolean) => {
        if (localTrack) {
            localTrack.setMuted(mute);
            dispatch(updateMuteStatus(mute));
        }
    };
    return {
        setMute,
        leave,
        // canVoice,
        voicingInfo,
        joining,
        joined: !!voicingInfo,
        joinVoice
    };
};
export { useVoice };
export default Voice;