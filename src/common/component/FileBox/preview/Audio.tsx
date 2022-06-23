import { FC, ReactEventHandler, useState } from "react";
import styled from "styled-components";

const Styled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .err {
    padding: 18px;
    /* font-weight: bold; */
    font-size: 16px;
    color: #999;
  }
  audio {
    width: 100%;
  }
`;

interface Props {
  url: string;
}

const Audio: FC<Props> = ({ url }) => {
  const [err, setErr] = useState(false);

  const handleError: ReactEventHandler<HTMLAudioElement> = (err) => {
    console.log("audio err", err);
    setErr(true);
  };

  if (!url) return null;
  return (
    <Styled>
      {err ? (
        <div className="err">Unable to play this audio</div>
      ) : (
        <audio controls src={url} onError={handleError} />
      )}
    </Styled>
  );
};

export default Audio;
