import { useState, useEffect } from "react";
import styled from "styled-components";
import uploadIcon from "../../assets/icons/upload.image.svg?url";
import { getInitials, getInitialsAvatar } from "../utils";
const StyledWrapper = styled.div`
  width: 96px;
  height: 96px;
  position: relative;
  cursor: pointer;
  .avatar {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
    /* border: 1px solid #eee; */
    img {
      width: 100%;
      height: 100%;
    }
    input[type="file"] {
      cursor: pointer;
      display: block;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .tip {
      white-space: nowrap;
      padding: 4px;
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      line-height: 18px;
    }
    &:hover .tip {
      display: flex;
    }
  }
  .icon {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 0;
    right: 0;
  }
`;
export default function AvatarUploader({
  url = "",
  name = "",
  uploadImage,
  disabled = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [currSrc, setCurrSrc] = useState("");
  useEffect(() => {
    if (!url) {
      const initialsSrc = getInitialsAvatar({ initials: getInitials(name) });
      setCurrSrc(initialsSrc);
    } else {
      setCurrSrc(url);
    }
  }, [url, name]);
  const handleUpload = async (evt) => {
    if (uploading) return;
    const [file] = evt.target.files;
    setUploading(true);
    await uploadImage(file);
    setUploading(false);
  };
  if (!currSrc) return null;
  return (
    <StyledWrapper>
      <div className="avatar">
        <img src={currSrc} alt="avatar" />
        {!disabled && (
          <>
            <div className="tip">
              {uploading ? `Uploading` : `Change Avatar`}
            </div>
            <input
              multiple={false}
              onChange={handleUpload}
              type="file"
              accept="image/*"
              name="avatar"
              id="avatar"
            />
          </>
        )}
      </div>
      {!disabled && <img src={uploadIcon} alt="icon" className="icon" />}
    </StyledWrapper>
  );
}
