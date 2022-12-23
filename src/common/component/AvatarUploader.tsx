import { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import uploadIcon from "../../assets/icons/upload.image.svg?url";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div<{ size: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  position: relative;
  cursor: pointer;
  .avatar {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
    img {
      object-fit: cover;
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
    display: none;
    width: 28px;
    height: 28px;
    position: absolute;
    top: 0;
    right: 0;
  }
  &:hover .icon {
    display: block;
  }
`;

type UID = number;
interface Props {
  size?: number;
  uid?: UID;
  className?: string;
  url?: string;
  name?: string;
  type?: "user" | "channel";
  disabled?: boolean;
  uploadImage: (param: File | { uid: number; file: File }) => void;
}

const AvatarUploader: FC<Props> = ({
  size = 96,
  uid,
  className = "",
  url = "",
  name = "",
  type = "user",
  uploadImage,
  disabled = false
}) => {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);
  const handleUpload = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (uploading) return;
    if (!evt.target.files) return;
    const [file] = Array.from(evt.target.files);
    setUploading(true);
    if (uid) {
      await uploadImage({ uid, file });
    } else {
      await uploadImage(file);
    }
    setUploading(false);
  };

  return (
    <StyledWrapper size={size} className={className}>
      <div className="avatar">
        <Avatar width={size} height={size} type={type} src={url} name={name} className={className} />
        {!disabled && (
          <>
            <div className="tip">
              {uploading ? t("status.uploading") : t("action.change_avatar")}
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
};

export default AvatarUploader;
