import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import WaveSurfer from 'wavesurfer.js';
import IconPause from '../../assets/icons/pause.svg';
import IconRefresh from '../../assets/icons/refresh.svg';
import IconPlay from '../../assets/icons/play.circle.svg';
import BASE_URL from '../../app/config';

export type VoiceMessageProps = {
    type: string,
    url: string,
    secure_url: string,
}
// 全局存储Voice信息
const VoiceMap: { [key: string]: WaveSurfer | null } = {};
const VoiceMessage = ({ file_path }: { file_path: string }) => {
    // const waveRef = useRef<WaveSurfer | null>(null);
    const containerRef = useRef(null);
    const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState("");
    // const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(`${BASE_URL}/resource/file?file_path=${encodeURIComponent(
    //     file_path
    // )}`));
    const initWave = (file_path: string) => {
        let wave: WaveSurfer | null = null;
        const audioSrc = `${BASE_URL}/resource/file?file_path=${encodeURIComponent(
            file_path
        )}`;
        wave = WaveSurfer.create({
            container: containerRef.current ?? "",
            // maxCanvasWidth: 200,
            height: 32,
            waveColor: '#0BA5EC',
            cursorColor: '#0BA5AA',
            progressColor: "#0BA5AA",
            hideScrollbar: true,
            // mediaControls: true,
            normalize: true,
        });
        wave.load(audioSrc);

        wave.on('error', function (err) {
            console.log("voice message error", err);
            setStatus("error");
            const current = VoiceMap[file_path];
            if (current) {
                current.destroy();
            }
        });
        wave.on('play', function () {
            setPlaying(true);
        });
        wave.on('pause', function () {
            setPlaying(false);
        });
        wave.on('ready', function () {
            setStatus("ready");
            const current = VoiceMap[file_path];
            if (current) {
                const dur = current.getDuration();
                const num = Math.ceil(dur);
                const durDisplay = dayjs.duration(num, 'seconds').format('mm:ss');
                setDuration(durDisplay);
            }
        });
        VoiceMap[file_path] = wave;
    };
    useEffect(() => {
        if (containerRef.current && file_path) {
            initWave(file_path);
        }
        return () => {
            const current = VoiceMap[file_path];
            if (current) {
                current.destroy();
            }
        };
    }, [file_path]);
    const handleClick = () => {
        const current = VoiceMap[file_path];
        if (current) {
            if (!current.isPlaying()) {
                // 先停掉其他的
                Object.keys(VoiceMap).forEach((key) => {
                    const item = VoiceMap[key];
                    if (item && item.backend && item.isPlaying()) {
                        item.stop();
                    }
                }
                );
            }
            current.playPause();
        }
    };
    const handleReload = () => {
        initWave(file_path);
    };
    const notReady = status !== "ready";
    return (
        <div className={clsx("relative select-none flex items-center gap-2 p-2 rounded-lg max-w-sm", status === "error" ? "bg-red-200" : "bg-primary-100 dark:bg-primary-900")}>
            <button className='disabled:opacity-60' onClick={handleClick} disabled={notReady}>
                {playing ? <IconPause className="stroke-primary-500" /> : <IconPlay className="stroke-primary-500" />}
            </button>
            <div ref={containerRef} className={clsx('flex-1 h-8 w-fit', notReady && "flex-center flex-1 whitespace-nowrap")} >
                {status == "loading" && <span className='text-xs'>Loading voice message...</span>}
                {status == "error" && <span className='text-xs text-red-800'>Load voice message error</span>}
            </div>
            {status !== "error" && <time className='text-primary-500 text-xs whitespace-nowrap text-left'>{duration}</time>}
            {status === "error" && <IconRefresh role="button" className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 stroke-primary-600" onClick={handleReload} />}
        </div>
    );
};

export default VoiceMessage;