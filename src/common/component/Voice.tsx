import AgoraRTC, { IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAgoraChannelsQuery, useGetAgoraStatusQuery, useLazyGetAgoraTokenQuery } from '../../app/services/server';
import { updateChannelVisibleAside } from '../../app/slices/footprint';
import { addVoiceMember, removeVoiceMember, updateConnectionState, updateDeafenStatus, updateMuteStatus, updateVoicingInfo, updateVoicingMember, updateVoicingNetworkQuality, upsertVoiceList } from '../../app/slices/voice';
import { useAppSelector } from '../../app/store';
import AudioJoin from '../../assets/join.wav';
// import { compareVersion } from '../utils';
// type Props = {}
AgoraRTC.setLogLevel(process.env.NODE_ENV === 'development' ? 0 : 4);
window.VOICE_TRACK_MAP = window.VOICE_TRACK_MAP ?? {};
// let tmpUids: number[] = [];
const Voice = () => {
    const { serverVersion } = useAppSelector(store => {
        return {
            serverVersion: store.server.version ?? 0,
            // joined: !!store.voice.voicing
        };
    });
    console.log("serverVersion", serverVersion);

    // const skipAgoraStatusCheck = compareVersion(serverVersion, '0.3.5') >= 0;
    const { data: enabled } = useGetAgoraStatusQuery();
    useGetAgoraChannelsQuery({ page_no: 0, page_size: 100 }, {
        skip: !enabled || !navigator.onLine,
        pollingInterval: 5000
    });
    const dispatch = useDispatch();
    useEffect(() => {
        const initializeAgoraClient = async () => {
            // 创建agora客户端实例
            const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            // 无论频道内是否有人说话，都会每两秒返回提示音量
            agoraEngine.enableAudioVolumeIndicator();
            // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
            agoraEngine.on("user-published", async (user, mediaType) => {
                // Subscribe to the remote user when the SDK triggers the "user-published" event.
                await agoraEngine.subscribe(user, mediaType);
                console.log(user, " has published at the channel");
                if (mediaType == "audio") {
                    // 播放远端音频
                    user.audioTrack?.play();
                    window.VOICE_TRACK_MAP[+user.uid] = user.audioTrack;
                }
                if (mediaType == "video") {
                    const id = `CAMERA_${user.uid}`;
                    console.log("video container id", id);

                    // 播放远端视频
                    user.videoTrack?.play(id);
                    window.VOICE_TRACK_MAP[+user.uid] = user.videoTrack;
                }
                agoraEngine.on("user-unpublished", (user) => {
                    //   远端用户取消了音频（muted）
                    dispatch(updateVoicingMember({ uid: +user.uid, info: { muted: true } }));
                });
                //remote user leave
                agoraEngine.on("user-left", (user, reason) => {
                    console.log(user, "has left the channel");
                    switch (reason) {
                        case "Quit":
                        case "ServerTimeOut": {
                            dispatch(removeVoiceMember(+user.uid as number));
                        }
                            break;
                        default:
                            break;
                    }
                });
                // 报告频道内正在说话的远端用户及其音量的回调。
                agoraEngine.on("volume-indicator", (vols) => {
                    vols.forEach((vol, index) => {
                        console.log(`${index} UID ${vol.uid} Level ${vol.level}`);
                        const { uid, level } = vol;
                        dispatch(updateVoicingMember({ uid: +uid, info: { speakingVolume: level } }));
                    });
                });
                // 信号强度
                agoraEngine.on("network-quality", (qlt) => {
                    const { downlinkNetworkQuality } = qlt;
                    dispatch(updateVoicingNetworkQuality(downlinkNetworkQuality));
                });
                // 连接状态有变化
                agoraEngine.on("connection-state-change", (state, prevState, reason) => {
                    console.log("connection-state-change", state, prevState, reason);
                    dispatch(updateConnectionState(state));
                });
                // 用户状态变化
                agoraEngine.on("user-info-updated", (uid, msg) => {
                    console.log("user-info-updated", uid, msg);
                    switch (msg) {
                        case "mute-audio":
                            // todo
                            dispatch(updateVoicingMember({ uid: +uid, info: { muted: true } }));
                            break;
                        case "unmute-audio":
                            // todo
                            dispatch(updateVoicingMember({ uid: +uid, info: { muted: false } }));
                            break;
                        default:
                            break;
                    }
                });
            });
            // 有新用户加入
            agoraEngine.on("user-joined", async (user) => {
                console.log(user.uid, !!localTrack, agoraEngine.channelName, " has joined the channel");
                dispatch(addVoiceMember(+user.uid));
            });
            window.VOICE_CLIENT = agoraEngine;
        };
        const handlePageUnload = (evt: BeforeUnloadEvent) => {
            console.log("unload");
            if (localTrack) {
                evt.preventDefault();
                return (evt.returnValue = "");
            }
        };
        window.addEventListener("beforeunload", handlePageUnload, { capture: true });
        if (!window.VOICE_CLIENT) {
            initializeAgoraClient();
        }

        return () => {
            window.removeEventListener("beforeunload", handlePageUnload, { capture: true });
        };
    }, []);


    return null;
};
let localTrack: IMicrophoneAudioTrack | null = null;
type VoiceProps = {
    id: number,
    context?: "channel" | "dm"
}
const audioJoin = new Audio(AudioJoin);
const useVoice = ({ id, context = "channel" }: VoiceProps) => {
    const dispatch = useDispatch();
    const { voicingInfo, loginUid } = useAppSelector(store => {
        return {
            loginUid: store.authData.user?.uid,
            voicingInfo: store.voice.voicing
        };
    });
    const [generateToken] = useLazyGetAgoraTokenQuery();
    // const [joining, setJoining] = useState(false);
    const joinVoice = async () => {
        // setJoining(true);
        dispatch(updateVoicingInfo({
            id,
            context,
            joining: true
        }));
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
                // play the join audio
                audioJoin.play();
                console.log("Publish success!,joined the channel");
                dispatch(updateVoicingInfo({
                    deafen: false,
                    muted: false,
                    joining: false,
                    id,
                    context,
                }));
                // 把自己加进去
                dispatch(addVoiceMember(uid));
            }
        } else {
            console.error("generate agora token error");
            dispatch(updateVoicingInfo({
                joining: false,
                id,
                context,
            }));

        }
        // setJoining(false);
    };
    const openCamera = async () => {
        if (localTrack) {
            localTrack.close();
            localTrack = null;
        }
        localTrack = await AgoraRTC.createCameraVideoTrack();
        await window.VOICE_CLIENT?.publish(localTrack);
        const id = `CAMERA_${loginUid}`;
        localTrack?.play(id);
    };
    const closeCamera = async () => {
        if (localTrack) {
            localTrack.close();
            localTrack = null;
        }
        localTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await window.VOICE_CLIENT?.publish(localTrack);
    };

    const leave = async () => {
        if (window.VOICE_CLIENT && localTrack) {
            localTrack.close();
            localTrack = null;
            await window.VOICE_CLIENT.leave();
            dispatch(updateVoicingInfo(null));
            if (context == "channel") {
                dispatch(updateChannelVisibleAside({
                    id, aside: null
                }));
                // 即时更新对应的活跃列表信息
                dispatch(upsertVoiceList({
                    id,
                    context,
                    memberCount: 0
                }));
            }
        }
    };
    const setMute = (mute: boolean) => {
        if (localTrack) {
            localTrack.setMuted(mute);
            dispatch(updateMuteStatus(mute));
        }
    };
    const setDeafen = (deafen: boolean) => {
        if (localTrack) {
            if (deafen) {
                localTrack.setMuted(true);
                // 远端音频，全部静音
                Object.entries(window.VOICE_TRACK_MAP).forEach(([, audioTrack]) => {
                    audioTrack?.setVolume(0);
                });
            } else {
                localTrack.setMuted(false);
                // 远端音频，恢复原音
                Object.entries(window.VOICE_TRACK_MAP).forEach(([, audioTrack]) => {
                    audioTrack?.setVolume(100);
                });
            }
            dispatch(updateDeafenStatus(deafen));
        }
    };
    const joinedAtThisContext = voicingInfo ? (voicingInfo.id == id && voicingInfo.context == context) : false;
    return {
        setMute,
        setDeafen,
        leave,
        // canVoice,
        voicingInfo,
        joining: voicingInfo ? voicingInfo.joining : undefined,
        joinedAtThisContext,
        joined: !!voicingInfo,
        joinVoice,
        openCamera,
        closeCamera
    };
};
export { useVoice };
export default memo(Voice);