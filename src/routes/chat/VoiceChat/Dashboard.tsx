import { useEffect } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng";
import useConfig from '../../../common/hook/useConfig';
import { useDispatch } from 'react-redux';
import { updateVoiceStatus } from '../../../app/slices/auth.data';

type Props = {
  channel: string,
  uid: number,
  voicing?: boolean;
}

const Dashboard = ({ voicing, uid, channel }: Props) => {
  const dispatch = useDispatch();
  console.log("aaaaa");

  const { agoraConfig } = useConfig("agora");
  useEffect(() => {
    console.log("aaa", agoraConfig);
    const startConnect = async () => {
      // Create an instance of the Agora Engine
      const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

      // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
      agoraEngine.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event.
        await agoraEngine.subscribe(user, mediaType);
        console.log("subscribe success");

        // // Subscribe and play the remote audio track.
        // if (mediaType == "audio")
        // {
        //   channelParameters.remoteUid=user.uid;
        //   // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
        //   channelParameters.remoteAudioTrack = user.audioTrack;
        //   // Play the remote audio track. 
        //   channelParameters.remoteAudioTrack.play();
        //   console.log("Remote user connected: " + user.uid);

        // }

        // Listen for the "user-unpublished" event.
        agoraEngine.on("user-unpublished", user => {
          console.log(user.uid + "has left the channel");
          console.log("Remote user has left the channel");
        });
      });
      // Join a channel.
      console.log("join data ", agoraConfig);
      await agoraEngine.join(agoraConfig!.app_id, agoraConfig!.rtm_key, agoraConfig!.rtm_secret, uid);
      console.log("Joined channel: " + agoraConfig!.rtm_key);
      // // Create a local audio track from the microphone audio.
      // channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // // Publish the local audio track in the channel.
      // await agoraEngine.publish(channelParameters.localAudioTrack);
      // console.log("Publish success!");
      dispatch(updateVoiceStatus(true));
    };

    if (!voicing && agoraConfig) {
      startConnect();
    }
  }, [voicing, agoraConfig, uid, channel]);

  return (
    <div>Dashboard</div>
  );
};

export default Dashboard;