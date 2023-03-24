// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import VoiceManagement from './VoiceManagement';
import JoinVoice from './JoinVoice';
import { useVoice } from '../../../common/component/Voice';

type Props = {
  context?: "channel" | "dm",
  id: number,
}

const Dashboard = ({ context = "channel", id }: Props) => {
  const { joinVoice, joined, joining, voiceInfo } = useVoice({ id, context });
  // const dispatch = useDispatch();


  return <div className='absolute -left-full -translate-x-full -top-1 z-50 shadow rounded p-2 bg-white dark:bg-black'>{joined ? <VoiceManagement info={voiceInfo} /> : <JoinVoice join={joinVoice} joining={joining} />}</div>;
};

export default Dashboard;