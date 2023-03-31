// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import VoiceManagement from './VoiceManagement';
import { useVoice } from '../../../common/component/Voice';

type Props = {
  visible: boolean,
  context?: "channel" | "dm",
  id: number,
}

const Dashboard = ({ context = "channel", id, visible }: Props) => {
  const { voicingInfo, setMute, setDeafen, leave } = useVoice({ id, context });
  // const dispatch = useDispatch();


  return <div className={`h-full flex-col gap-1 w-[226px] overflow-y-scroll overflow-x-hidden p-2 shadow-[inset_1px_0px_0px_rgba(0,_0,_0,_0.1)] ${visible ? "flex" : "hidden"}`}>
    <VoiceManagement info={voicingInfo} setMute={setMute} setDeafen={setDeafen} leave={leave} />
  </div>;
};

export default Dashboard;