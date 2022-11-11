// import React from 'react';
import clsx from 'clsx';

type Props = {
    uid: number,
    host?: boolean,
    content: string,
    sending: boolean
}

const Text = ({ content, host, sending }: Props) => {

    return host ?
        <div className="text-md text-gray-900 bg-gray-100 rounded-lg px-3 py-1.5 break-words" style={{ maxWidth: 'min(((100vw - 56px) - 20px) - 64px, 360px)' }}>
            {content}
        </div>
        :
        <div className={clsx("text-md text-white bg-[#1fe1f9] rounded-lg px-3 py-1.5 transition-all break-words", sending ? 'opacity-70' : "")} style={{ maxWidth: 'min(((100vw - 56px) - 20px) - 64px, 360px)' }}>
            {content}
        </div>
        ;
};

export default Text;