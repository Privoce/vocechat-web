import { ChangeEvent, FC, useState } from "react";
import Avatar from "./Avatar";
import uploadIcon from "../../assets/icons/upload.image.svg?url";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

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
    <div style={{ width: `${size}px`, height: `${size}px` }} className={clsx(className, "relative group")}>
      <div className="group overflow-hidden relative w-full h-full rounded-full bg-gray-50">
        <Avatar width={size} height={size} type={type} src={url} name={name} className={`${className} object-cover w-full h-full`} />
        {!disabled && (
          <>
            <div className="flex-center flex-col whitespace-nowrap hidden group-hover:flex p-1 absolute top-0 left-0 right-0 bottom-0 bg-black/50 text-white font-bold text-xs">
              {uploading ? t("status.uploading") : t("action.change_avatar")}
            </div>
            <input
              className="opacity-0 absolute top-0 left-0 right-0 bottom-0 block cursor-pointer"
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
      {!disabled && <img src={uploadIcon} alt="icon" className="hidden w-7 h-7 absolute top-0 right-0 group-hover:block" />}
    </div>
  );
};

export default AvatarUploader;
