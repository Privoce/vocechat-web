import { FC, ReactEventHandler, useState } from "react";

interface Props {
  url: string;
}

const Audio: FC<Props> = ({ url }) => {
  const [err, setErr] = useState(false);

  const handleError: ReactEventHandler<HTMLAudioElement> = (err) => {
    console.error("audio err", err);
    setErr(true);
  };

  if (!url) return null;
  return (
    <div className="flex items-center justify-center h-full">
      {err ? (
        <div className="p-[18px] text-base text-gray-500">Unable to play this audio</div>
      ) : (
        <audio className="w-full" controls src={url} onError={handleError} />
      )}
    </div>
  );
};

export default Audio;
