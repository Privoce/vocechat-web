// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import VoiceManagement from './VoiceManagement';
import { useVoice } from '../../../common/component/Voice';
import { ChatContext } from '../../../types/common';

type Props = {
  visible: boolean,
  context?: ChatContext,
  id: number,
}

const Dashboard = ({ context = "channel", id, visible }: Props) => {
  const { voicingInfo, setMute, leave, closeCamera, openCamera, startShareScreen, stopShareScreen } = useVoice({ id, context });
  // const dispatch = useDispatch();


  return <div className={`h-full flex-col gap-1 w-[226px] overflow-y-scroll overflow-x-hidden p-2 shadow-[inset_1px_0px_0px_rgba(0,_0,_0,_0.1)] ${visible ? "flex" : "hidden"}`}>
    <VoiceManagement id={id} context={context} info={voicingInfo} setMute={setMute} leave={leave} closeCamera={closeCamera} openCamera={openCamera} startShareScreen={startShareScreen} stopShareScreen={stopShareScreen} />
  </div>;
};

export default Dashboard;