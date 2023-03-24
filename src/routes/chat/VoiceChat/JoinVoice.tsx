import React from 'react';
import StyledButton from '../../../common/component/styled/Button';

type Props = {
    join: () => void,
    joining: boolean
}

const JoinVoice = ({ joining, join }: Props) => {
    if (joining) return <div>
        Joining
    </div>;
    return (
        <div>
            <StyledButton className='mini' onClick={join}>Join</StyledButton>
        </div>
    );
};

export default JoinVoice;