// import { useState } from 'react';
import { formatBytes } from '../../utils';
import IconDownload from "../../../assets/icons/download.svg";
import IconAudio from "../../../assets/icons/file.audio.svg";

type Props = {
    url: string,
    name: string,
    size: number,
    download: string
}

const AudioMessage = ({ url, name, size, download }: Props) => {
    const _size = formatBytes(size);
    return (
        <div className='w-96 flex flex-col gap-2 px-3 py-2 rounded-md border border-solid border-gray-300 overflow-hidden bg-[#f1f3f4]'>
            <div className="flex justify-between z-30 overflow-hidden">
                <div className="flex gap-2 ">
                    <IconAudio className="w-9 h-auto" />
                    <div className="flex flex-col gap-1 text-sm text-gray-700">
                        <span title={name} className='font-bold whitespace-nowrap text-ellipsis w-[240px] overflow-hidden'>{name}</span>
                        <span>{_size}</span>
                    </div>
                </div>
                <a href={download} className="mt-2"><IconDownload className="download_icon gray" /></a>
            </div>
            <audio src={url} controls className="w-full object-cover z-10" />
        </div>
    );
};

export default AudioMessage;