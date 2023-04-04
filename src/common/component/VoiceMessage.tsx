import { useState } from 'react';

export type VoiceMessageProps = {
    type: string,
    url: string,
    secure_url: string,
}

const VoiceMessage = ({ data }: { data: VoiceMessageProps }) => {
    const [audio, setAudio] = useState(new Audio(data.url));
    // useEffect(() => {
    //   first

    //   return () => {
    //     second
    //   }
    // }, [url])

    return (
        <div className='bg-green-800'>
            audio message
        </div>
    );
};

export default VoiceMessage;