// import React from 'react'
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Styled = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  img {
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .progress {
      width: 15px;
      height: 15px;
      .CircularProgressbar-path {
        stroke: #444;
      }
    }
  }
`;
import { getDefaultSize } from "../../utils";
export default function Image({
  uploading,
  progress,
  thumbnail,
  download,
  content,
  properties = {},
}) {
  const { width = 0, height = 0 } = getDefaultSize(properties);
  console.log("image props", properties, width, height);
  return (
    <Styled>
      {uploading && (
        <div className="overlay">
          <div className="progress">
            <CircularProgressbar
              value={progress}
              strokeWidth={50}
              styles={buildStyles({
                storke: "#000",
                strokeLinecap: "butt",
              })}
            />
          </div>
        </div>
      )}
      <img
        className="img preview"
        style={{
          width: width ? `${width}px` : "",
          height: height ? `${height}px` : "",
        }}
        data-meta={JSON.stringify(properties)}
        data-origin={content}
        data-download={download}
        src={thumbnail || download || content}
      />
    </Styled>
  );
}
