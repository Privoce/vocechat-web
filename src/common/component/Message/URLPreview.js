import { useState, useEffect } from "react";
import styled from "styled-components";
const StyledCompact = styled.a`
  background: #f3f4f6;
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 12px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 380px;
  .favicon {
    display: flex;
    width: 48px;
    height: 48px;
    border-radius: 4px;
    img {
      /* width: 100%;
      height: 100%; */
      object-fit: contain;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #1c1c1e;
    }
    .desc {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
    }
    .link {
      font-weight: 400;
      font-size: 10px;
      line-height: 18px;
      color: #616161;
    }
    .dots {
      width: 288px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
const StyledDetails = styled.a`
  width: 380px;
  padding: 12px;
  background: #f3f4f6;
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  .title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #06aed4;
  }
  .desc {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #616161;
    margin-bottom: 8px;
    width: 356px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .image {
    width: 100%;
    height: 180px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export default function URLPreview({ url = "" }) {
  const [data, setData] = useState({
    favicon:
      "https://fanyi-cdn.cdn.bcebos.com/static/translation/img/favicon/favicon-32x32_ca689c3.png",
    title: "Preview Hunt",
    description:
      "A tool to preview and prepare your Product Hunt,A tool to preview and prepare your Product Hunt...",
    ogImage:
      "https://pbs.twimg.com/media/FProPfYaMAIm6KL?format=png&name=900x900",
  });
  useEffect(() => {
    const getMetaData = async (url) => {
      // todo
    };
    getMetaData(url);
  }, [url]);

  if (!url || !data) return null;
  const { favicon, title, description, ogImage } = data;
  return ogImage ? (
    <StyledDetails href={url} target="_blank">
      <h3 className="title">{title}</h3>
      <p className="desc dots">{description}</p>
      <div className="image">
        <img src={ogImage} alt="og image" />
      </div>
    </StyledDetails>
  ) : (
    <StyledCompact href={url} target="_blank">
      <div className="favicon">
        <img src={favicon} alt="favicon" />
      </div>
      <div className="info">
        <h3 className="title">{title}</h3>
        <p className="desc dots">{description}</p>
        <span className="link dots">{url}</span>
      </div>
    </StyledCompact>
  );
}
