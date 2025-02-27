import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import WaveSurfer from "wavesurfer.js";

import IconPause from "@/assets/icons/pause.svg";
import IconPlay from "@/assets/icons/play.circle.svg";
// import IconRefresh from "@/assets/icons/refresh.svg";
import BASE_URL from "../app/config";
import ExpiredMessage from "./FileMessage/ExpiredMessage";

export type VoiceMessageProps = {
  type: string;
  url: string;
  secure_url: string;
};
// 全局存储 Voice 信息
const VoiceMap: { [key: string]: WaveSurfer | null } = {};
const VoiceMessage = ({ file_path }: { file_path: string }) => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("");
  const initWave = async (file_path: string) => {
    let wave: WaveSurfer | null = null;
    const audioSrc = `${BASE_URL}/resource/file?file_path=${encodeURIComponent(file_path)}`;
    console.log("audioSrc", audioSrc);
    try {
      // 先检测资源是否存在
      await fetch(audioSrc);
      wave = WaveSurfer.create({
        container: containerRef.current ?? "",
        height: 32,
        waveColor: "#0BA5EC",
        cursorColor: "#0BA5AA",
        progressColor: "#0BA5AA",
        hideScrollbar: true,
        normalize: true
      });
      wave.load(audioSrc);
      wave.on("play", function () {
        setPlaying(true);
      });
      wave.on("pause", function () {
        setPlaying(false);
      });
      wave.on("ready", function () {
        setStatus("ready");
        const current = VoiceMap[file_path];
        if (current) {
          const dur = current.getDuration();
          const num = Math.ceil(dur);
          const durDisplay = dayjs.duration(num, "seconds").format("mm:ss");
          setDuration(durDisplay);
        }
      });
      VoiceMap[file_path] = wave;
    } catch (error) {
      console.error(error);
      
      setStatus("error");
    }
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
          try {
            const item = VoiceMap[key];
            if (item && item.isPlaying()) {
              item.stop();
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
      current.playPause();
    }
  };

  const notReady = status !== "ready";
  if (status == "error") return <ExpiredMessage type="audio" />;
  return (
    <div
      className={clsx(
        "relative whitespace-nowrap select-none flex items-center gap-2 p-2 rounded-lg max-w-sm",
        "bg-primary-100 dark:bg-primary-900"
      )}
    >
      <button className="disabled:opacity-60" onClick={handleClick} disabled={notReady}>
        {playing ? (
          <IconPause className="stroke-primary-500" />
        ) : (
          <IconPlay className="stroke-primary-500" />
        )}
      </button>
      <div ref={containerRef} className={clsx("flex-1 h-8 min-w-[150px]")}>
        {status == "loading" && <span className="text-xs leading-8">Loading voice message...</span>}
      </div>
      <time className="text-primary-500 text-xs whitespace-nowrap text-left">{duration}</time>
    </div>
  );
};

export default VoiceMessage;
