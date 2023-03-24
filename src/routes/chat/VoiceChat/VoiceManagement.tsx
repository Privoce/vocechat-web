import React from 'react';
import { VoiceInfo } from '../../../app/slices/voice';
import { useAppSelector } from '../../../app/store';
import User from '../../../common/component/User';

type Props = {
    info: VoiceInfo | null
}

const VoiceManagement = ({ info }: Props) => {
    const userData = useAppSelector(store => store.users.byId);
    if (!info) return null;
    const { context, id, members } = info;
    return (
        <div>
            <ul>
                {members.map((uid) => {
                    return <li key={uid}>
                        <User uid={uid} interactive={false} />
                        {/* {userData[uid]?.name} */}
                    </li>;
                })}

            </ul>
        </div>
    );
};

export default VoiceManagement;