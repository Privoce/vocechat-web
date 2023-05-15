// import React from 'react';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
import { Waveform } from '@uiball/loaders';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../app/store';
import Tooltip from "../Tooltip";
import IconCallOff from '@/assets/icons/call.off.svg';
import IconCallAnswer from '@/assets/icons/call.svg';
import Avatar from '../Avatar';
import { updateCalling } from '../../app/slices/voice';
import useVoice from './useVoice';
import { playAgoraVideo } from '../../utils';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    from: number
    to?: number
}

const DMCalling = ({ from, to = 0 }: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { leave, joinVoice, joining } = useVoice({ id: to, context: "dm" });
    const containerRef = useRef(null);
    const { voicingInfo, voicingMembers, fromUser, toUser, loginUser } = useAppSelector(store => {
        return {
            voicingInfo: store.voice.voicing ?? {},
            voicingMembers: store.voice.voicingMembers,
            fromUser: store.users.byId[from],
            toUser: store.users.byId[to],
            loginUser: store.authData.user
        };
    });
    const sendByMe = loginUser?.uid !== toUser.uid;

    useEffect(() => {
        const ids = voicingMembers.ids;
        ids.forEach(id => {
            playAgoraVideo(id);
        });
    }, [voicingMembers.ids]);
    const handleCancel = () => {
        console.log('cancel');
        if (sendByMe || voicingMembers.ids.length == 2) {
            leave();
        }
        dispatch(updateCalling({ from: 0, to: 0 }));
    };
    const handleAnswer = () => {
        joinVoice();
        navigate(`/chat/dm/${from}`);
    };
    const { name, avatar } = sendByMe ? toUser : fromUser;
    const connected = voicingMembers.ids.length == 2;
    console.log("dm calling", !fromUser, !toUser, connected);
    const atChatPath = sendByMe ? pathname == `/chat/dm/${to}` : pathname == `/chat/dm/${from}`;
    if (!fromUser || !toUser || connected || atChatPath) return null;

    return (
        <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen z-[999] pointer-events-none flex items-center justify-end pr-10">
            <motion.aside drag dragConstraints={containerRef} dragMomentum={false} whileDrag={{ scale: 1.1 }} className={clsx(`pointer-events-auto 
        rounded bg-gray-800  relative
        shadow-lg shadow-slate-200 dark:shadow-slate-800 
        cursor-move overflow-hidden
        w-64 h-80
        `)}>

                <div className="absolute right-0-0 top-0 w-40 h-32" id={`CAMERA_${to}`}>
                    {/* to camera video */}
                </div>
                <div className={clsx("absolute left-0 top-0 py-5 w-full h-full flex flex-col justify-between items-center", connected ? "bg-transparent" : "bg-gray-800")}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="rounded-full overflow-hidden w-20 h-20 shrink-0">
                            <Avatar name={name} src={avatar} width={80} height={80} className='h-20' />
                        </div>
                        <span className='text-white mb-2'>{name}</span>
                    </div>
                    <div className='flex flex-col gap-1 items-center my-4'>
                        <Waveform
                            size={18}
                            lineWeight={3}
                            speed={1}
                            color='#aaa'
                        />
                        <span className='text-xs text-gray-600 dark:text-gray-400'>{sendByMe ? `Calling` : `Incoming call`}</span>
                    </div>
                    <div className={clsx("flex gap-3", connected ? "h-full items-end" : "")}>
                        <Tooltip tip={"Disconnect"} placement="top">
                            <button onClick={handleCancel} className='flex-center bg-red-600 hover:bg-red-700 py-2 px-3 rounded-lg'>
                                <IconCallOff className="w-6 h-6" />
                            </button>
                        </Tooltip>
                        {!sendByMe &&
                            <Tooltip tip={"Answer"} placement="top">
                                <button disabled={joining} onClick={handleAnswer} className='flex-center bg-green-600 hover:bg-green-700 py-2 px-3 rounded-lg'>
                                    <IconCallAnswer className="w-6 h-6 fill-white" />
                                </button>
                            </Tooltip>
                        }
                    </div>
                </div>
            </motion.aside>
        </div>
    );
};

export default DMCalling;