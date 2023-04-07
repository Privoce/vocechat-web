import { useState } from 'react';
import { formatBytes } from '../../utils';
import IconDownload from "../../../assets/icons/download.svg";
import IconAudio from "../../../assets/icons/file.audio.svg";
import clsx from 'clsx';

type Props = {
    url: string,
    name: string,
    size: number,
    download: string
}

const AudioMessage = ({ url, name, size, download }: Props) => {
    const [canPlay, setCanPlay] = useState(false);
    const handleCanPlay = () => {
        setCanPlay(true);
    };
    const _size = formatBytes(size);
    return (
        <div className='w-96 flex flex-col gap-2 px-3 py-2 rounded-md border border-solid border-gray-300 dark:border-gray-500 overflow-hidden bg-stone-100 dark:bg-stone-900'>
            <div className="flex justify-between z-30 overflow-hidden">
                <div className="flex gap-2 ">
                    <IconAudio className="w-9 h-auto" />
                    <div className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
                        <span title={name} className='font-bold w-[240px] truncate'>{name}</span>
                        <span>{_size}</span>
                    </div>
                </div>
                <a href={download} className="mt-2"><IconDownload className="fill-gray-500 dark:fill-gray-400" /></a>
            </div>
            <audio src={url} onCanPlay={handleCanPlay} controls className={clsx("w-full object-cover z-10", canPlay ? "visible" : "invisible")} />
        </div>
    );
};

export default AudioMessage;