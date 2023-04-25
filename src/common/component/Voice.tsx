import AgoraRTC, { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAgoraChannelsQuery, useGetAgoraStatusQuery, useGenerateAgoraTokenMutation } from '../../app/services/server';
import { updateChannelVisibleAside } from '../../app/slices/footprint';
import { addVoiceMember, removeVoiceMember, updateConnectionState, updateDeafenStatus, updateMuteStatus, updateVoicingInfo, updateVoicingMember, updateVoicingNetworkQuality, upsertVoiceList } from '../../app/slices/voice';
import { useAppSelector } from '../../app/store';
import AudioJoin from '../../assets/join.wav';
import { playAgoraVideo } from '../utils';
import { ShareScreenTrack } from '../../types/global';
AgoraRTC.setLogLevel(process.env.NODE_ENV === 'development' ? 0 : 4);
window.VOICE_TRACK_MAP = window.VOICE_TRACK_MAP ?? {};
window.VIDEO_TRACK_MAP = window.VIDEO_TRACK_MAP ?? {};
// let tmpUids: number[] = [];
const Voice = () => {
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
                    window.VIDEO_TRACK_MAP[+user.uid] = user.videoTrack;
                    playAgoraVideo(+user.uid);
                }
                agoraEngine.on("user-unpublished", (user) => {
                    if (!user.hasAudio) {
                        //   远端用户取消了音频（muted）
                        dispatch(updateVoicingMember({ uid: +user.uid, info: { muted: true } }));
                    }
                    if (!user.hasVideo) {
                        //   远端用户取消了视频
                        dispatch(updateVoicingMember({ uid: +user.uid, info: { video: false } }));
                        // 关闭视频后，需要把视频的高度设置回去
                        const playerEle = document.querySelector(`#CAMERA_${user.uid}`) as HTMLElement;
                        playerEle.classList.remove("h-[120px]");
                    }
                });
                //remote user leave
                agoraEngine.on("user-left", (user, reason) => {
                    console.log(user, "has left the channel");
                    switch (reason) {
                        case "Quit":
                        case "ServerTimeOut": {
                            dispatch(removeVoiceMember(+user.uid as number));
                            // clear tracks
                            window.VOICE_TRACK_MAP[+user.uid] = null;
                            window.VIDEO_TRACK_MAP[+user.uid] = null;
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
                console.log(user.uid, agoraEngine.channelName, " has joined the channel");
                dispatch(addVoiceMember(+user.uid));
            });
            window.VOICE_CLIENT = agoraEngine;
        };
        const handlePageUnload = (evt: BeforeUnloadEvent) => {
            console.log("unload");
            if (window.VOICE_CLIENT?.connectionState === "CONNECTED") {
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
type VoiceProps = {
    id: number,
    context?: "channel" | "dm"
}
const audioJoin = new Audio(AudioJoin);
const useVoice = ({ id, context = "channel" }: VoiceProps) => {
    const dispatch = useDispatch();
    const { voicingInfo, loginUid } = useAppSelector(store => {
        return {
            loginUid: store.authData.user?.uid ?? 0,
            voicingInfo: store.voice.voicing
        };
    });
    const [generateToken] = useGenerateAgoraTokenMutation();
    // const [joining, setJoining] = useState(false);
    const joinVoice = async () => {
        // setJoining(true);
        dispatch(updateVoicingInfo({
            id,
            context,
            joining: true
        }));
        const resp = await generateToken(context == "channel" ? { gid: id } : { uid: id });
        if ('error' in resp) {
            console.error("generate agora token error");
            dispatch(updateVoicingInfo({
                joining: false,
                id,
                context,
            }));
        } else {
            console.table(resp.data);
            const { channel_name, app_id, agora_token, uid } = resp.data;
            if (window.VOICE_CLIENT) {
                await window.VOICE_CLIENT.join(app_id, channel_name, agora_token, uid);
                // Create a local audio track from the microphone audio.
                const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                // Publish the local audio track in the channel.
                await window.VOICE_CLIENT.publish(localAudioTrack);
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
                // 放到全局变量里
                window.VOICE_TRACK_MAP[loginUid] = localAudioTrack;
            }

        }
        // setJoining(false);
    };
    const openCamera = async () => {
        const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await window.VOICE_CLIENT?.publish(localVideoTrack);
        dispatch(updateVoicingInfo({
            video: true,
            id,
            context,
        }));
        // 放到全局变量里
        window.VIDEO_TRACK_MAP[loginUid] = localVideoTrack;
        playAgoraVideo(loginUid);
    };
    const closeCamera = async () => {
        const localVideoTrack = window.VIDEO_TRACK_MAP[loginUid] as ICameraVideoTrack;
        if (localVideoTrack) {
            await window.VOICE_CLIENT?.unpublish(localVideoTrack);
            localVideoTrack.close();
            window.VIDEO_TRACK_MAP[loginUid] = null;
            // 关闭视频后，需要把视频的高度设置回去
            const playerEle = document.querySelector(`#CAMERA_${loginUid}`) as HTMLElement;
            playerEle.classList.remove("h-[120px]");
            dispatch(updateVoicingInfo({
                video: false,
                id,
                context,
            }));
        }
    };
    const stopShareScreen = async () => {
        const localVideoTrack = window.VIDEO_TRACK_MAP[loginUid] as ShareScreenTrack;
        if (localVideoTrack) {
            await window.VOICE_CLIENT?.unpublish(localVideoTrack);
            if ("close" in localVideoTrack) {
                localVideoTrack.close();
            } else {
                localVideoTrack[0].close();
            }
            // localVideoTrack.close();
            window.VIDEO_TRACK_MAP[loginUid] = null;
            // 关闭视频后，需要把视频的高度设置回去
            const playerEle = document.querySelector(`#CAMERA_${loginUid}`) as HTMLElement;
            playerEle.classList.remove("h-[120px]");
            dispatch(updateVoicingInfo({
                video: false,
                shareScreen: false,
                id,
                context,
            }));
        }
    };
    const startShareScreen = async () => {
        try {
            const localVideoTrack = await AgoraRTC.createScreenVideoTrack({
                // 配置屏幕共享编码参数，详情请查看 API 文档。
                encoderConfig: "1080p_1",
                // 设置视频传输优化策略为清晰优先或流畅优先。
                optimizationMode: "detail",
            });

            // 取消正在进行的视频
            await closeCamera();
            await window.VOICE_CLIENT?.publish(localVideoTrack);
            dispatch(updateVoicingInfo({
                video: false,
                shareScreen: true,
                id,
                context,
            }));
            // 放到全局变量里
            window.VIDEO_TRACK_MAP[loginUid] = localVideoTrack;
            playAgoraVideo(loginUid);
            // 监听屏幕共享结束事件 
            if ("close" in localVideoTrack) {
                localVideoTrack.getMediaStreamTrack().onended = () => {
                    stopShareScreen();
                };
            }
        } catch (error) {
            console.log("start share screen error", error);

        }
    };

    const leave = async () => {
        const localAudioTrack = window.VOICE_TRACK_MAP[loginUid] as IMicrophoneAudioTrack;
        const localVideoTrack = window.VIDEO_TRACK_MAP[loginUid] as ICameraVideoTrack;
        if (window.VOICE_CLIENT) {
            await window.VOICE_CLIENT.leave();
            dispatch(updateVoicingInfo(null));
            if (localAudioTrack) {
                localAudioTrack.close();
                window.VOICE_TRACK_MAP[loginUid] = null;
            }
            if (localVideoTrack) {
                localVideoTrack.close();
                window.VIDEO_TRACK_MAP[loginUid] = null;
            }
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
        const localAudioTrack = window.VOICE_TRACK_MAP[loginUid] as IMicrophoneAudioTrack;
        if (!localAudioTrack) return;
        localAudioTrack.setMuted(mute);
        if (mute == false && voicingInfo?.deafen) {
            // 远端音频，恢复原音
            Object.entries(window.VOICE_TRACK_MAP).forEach(([, audioTrack]) => {
                audioTrack?.setVolume(100);
            });
            dispatch(updateDeafenStatus(false));
        }
        dispatch(updateMuteStatus(mute));
    };
    const setDeafen = (deafen: boolean) => {
        const localAudioTrack = window.VOICE_TRACK_MAP[loginUid] as IMicrophoneAudioTrack;
        if (!localAudioTrack) return;
        if (deafen) {
            localAudioTrack.setMuted(true);
            // 远端音频，全部静音
            Object.entries(window.VOICE_TRACK_MAP).forEach(([, audioTrack]) => {
                audioTrack?.setVolume(0);
            });
        } else {
            localAudioTrack.setMuted(false);
            // 远端音频，恢复原音
            Object.entries(window.VOICE_TRACK_MAP).forEach(([, audioTrack]) => {
                audioTrack?.setVolume(100);
            });
        }
        dispatch(updateDeafenStatus(deafen));
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
        closeCamera,
        startShareScreen,
        stopShareScreen,
    };
};
export { useVoice };
export default memo(Voice);