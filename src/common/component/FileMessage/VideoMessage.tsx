import { SyntheticEvent, useState } from 'react';
import { Orbit } from "@uiball/loaders";
import { formatBytes } from '../../utils';
import IconDownload from "../../../assets/icons/download.svg";
import IconVideo from "../../../assets/icons/file.video.svg";
// import clsx from 'clsx';

type Props = {
    url: string,
    name: string,
    size: number,
    download: string
}

const VideoMessage = ({ url, name, size, download }: Props) => {
    const [canPlay, setCanPlay] = useState(false);
    const [error, setError] = useState(false);
    const _size = formatBytes(size);
    const handlePlay = (evt: SyntheticEvent<HTMLVideoElement>) => {
        const infoEle = evt.currentTarget.previousSibling;
        if (infoEle) {
            (infoEle as HTMLDivElement).classList.add("hidden");
        }
    };
    const handlePause = (evt: SyntheticEvent<HTMLVideoElement>) => {
        const infoEle = evt.currentTarget.previousSibling;
        if (infoEle) {
            (infoEle as HTMLDivElement).classList.remove("hidden");
        }
    };
    const handleCanPlay = () => {
        setCanPlay(true);
    };
    const handleError = () => {
        setCanPlay(false);
        setError(true);
    };
    const tipClass = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    return (
        <div className='w-64 h-32 md:w-96 md:h-52 relative rounded-md border border-solid border-gray-300 overflow-hidden group'>
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-20 group-hover:hidden"></div>
            <div className="absolute top-0 left-0 w-full flex justify-between z-30 px-3 py-2 overflow-hidden group-hover:bg-black/20">
                <div className="flex gap-2 ">
                    <IconVideo className="w-9 h-auto" />
                    <div className="flex flex-col gap-1 text-sm text-white">
                        <span title={name} className='font-bold w-[240px] truncate'>{name}</span>
                        <span>{_size}</span>
                    </div>
                </div>
                <a href={download} className="mt-2"><IconDownload className="fill-white" /></a>
            </div>
            {!canPlay ?
                <div className={tipClass}>
                    <Orbit color='#fff' />
                </div> :
                (error ?
                    <span className={`${tipClass} text-red-500`}>Error</span> :
                    null)
            }
            <video onPlay={handlePlay} onError={handleError} onCanPlay={handleCanPlay} onPause={handlePause} controls={canPlay} className="absolute left-0 top-0 w-full h-full object-cover z-10">
                <source src={url} type="video/mp4"></source>
            </video>
        </div>
    );
};

export default VideoMessage;