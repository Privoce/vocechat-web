import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import WaveSurfer from 'wavesurfer.js';
import IconPause from '../../assets/icons/pause.svg';
import IconPlay from '../../assets/icons/play.circle.svg';
import BASE_URL from '../../app/config';

export type VoiceMessageProps = {
    type: string,
    url: string,
    secure_url: string,
}

const VoiceMessage = ({ file_path }: { file_path: string }) => {
    const waveRef = useRef<WaveSurfer | null>(null);
    const containerRef = useRef(null);
    const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState("");
    // const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(`${BASE_URL}/resource/file?file_path=${encodeURIComponent(
    //     file_path
    // )}`));
    useEffect(() => {
        let wave: WaveSurfer | null = null;
        if (containerRef.current && file_path) {
            const audioSrc = `${BASE_URL}/resource/file?file_path=${encodeURIComponent(
                file_path
            )}`;
            wave = WaveSurfer.create({
                container: containerRef.current,
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
            });
            wave.on('play', function () {
                setPlaying(true);
            });
            wave.on('pause', function () {
                setPlaying(false);
            });
            wave.on('ready', function () {
                setStatus("ready");
                console.log("readd");

                if (waveRef.current) {
                    const dur = waveRef.current.getDuration();
                    const num = Math.ceil(dur);
                    const durDisplay = dayjs.duration(num, 'seconds').format('mm:ss');
                    setDuration(durDisplay);
                }
            });
            waveRef.current = wave;
        }
        return () => {
            if (waveRef.current) {
                waveRef.current.destroy();
            }
        };
    }, [file_path]);
    const handleClick = () => {
        if (waveRef.current) {
            if (waveRef.current.isPlaying()) {
                waveRef.current.pause();
            } else {
                waveRef.current.play();
            }
        }
    };
    return (
        <div className={clsx("select-none flex items-center gap-2 p-2 rounded-lg max-w-sm", status === "error" ? "bg-red-200" : "bg-primary-100 dark:bg-primary-900")}>
            <button className='disabled:opacity-60' onClick={handleClick} disabled={status !== "ready"}>
                {playing ? <IconPause className="stroke-primary-500" /> : <IconPlay className="stroke-primary-500" />}
            </button>
            <div ref={containerRef} className='flex-1 h-8' >
                {status == "loading" && <span className='text-xs'>Loading voice message...</span>}
                {status == "error" && <span className='text-xs text-red-800'>Load voice message error</span>}
            </div>
            <time className='text-primary-500 text-xs whitespace-nowrap text-left'>{duration}'</time>
        </div>
    );
};

export default VoiceMessage;