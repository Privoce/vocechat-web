import React from 'react';
import StyledButton from '../../../common/component/styled/Button';

type Props = {
    join: () => void,
    joining: boolean
}

const JoinVoice = ({ joining, join }: Props) => {
    if (joining) return <div className='w-full h-full flex-center p-1 text-sm text-gray-600 dark:text-gray-400'>
        Connecting to voice channel...
    </div>;
    return (
        <div className='w-full h-full flex-center p-4'>
            <StyledButton className='w-full' onClick={join}>Start Audio Chat</StyledButton>
        </div>
    );
};

export default JoinVoice;