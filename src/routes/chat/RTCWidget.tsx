import React from 'react';
import { useAppSelector } from '../../app/store';
import User from '../../common/component/User';
import IconHeadphone from '../../assets/icons/headphone.svg';
import IconMic from '../../assets/icons/mic.on.svg';

type Props = {}

const RTCWidget = (props: Props) => {
    const { loginUser, voicing } = useAppSelector(store => { return { loginUser: store.authData.user, voicing: store.authData.voice }; });
    if (!loginUser) return null;

    return (
        <div className='bg-gray-100 dark:bg-gray-900 flex flex-col  p-2 rounded-full m-3 text-sm'>
            {voicing && <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-green-800">
                    Voice Connected
                </div>
            </div>}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <User uid={loginUser.uid} compact />
                    <div className="flex flex-col">
                        <span className='dark:text-white text-sm'>{loginUser.name}</span>
                        <span className='text-gray-400 text-xs'>#{loginUser.uid}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <IconHeadphone role="button" />
                    <IconMic role="button" />
                </div>
            </div>
        </div>
    );
};

export default RTCWidget;