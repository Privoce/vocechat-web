import BASE_URL, { FILE_IMAGE_SIZE, ContentTypes } from "../app/config";
import IconPdf from "../assets/icons/file.pdf.svg";
import IconAudio from "../assets/icons/file.audio.svg";
import IconVideo from "../assets/icons/file.video.svg";
import IconUnkown from "../assets/icons/file.unkown.svg";
import IconDoc from "../assets/icons/file.doc.svg";
import IconCode from "../assets/icons/file.code.svg";
import IconImage from "../assets/icons/file.image.svg";
export const isImage = (file_type = "", size = 0) => {
  return file_type.startsWith("image") && size <= FILE_IMAGE_SIZE;
};
export const isObjectEqual = (obj1, obj2) => {
  let o1 = JSON.stringify(obj1 ?? {});
  let o2 = JSON.stringify(obj2 ?? {});
  return o1 === o2;
};
export const isTreatAsImage = (file) => {
  let isImage = false;
  if (!file) return isImage;
  const { type, size } = file;
  if (type.startsWith("image")) {
    // 10MB
    return size < 1000 * 1000;
  }
  return isImage;
};

export const getNonNullValues = (obj, whiteList = ["log_id"]) => {
  const tmp = {};
  Object.keys(obj).forEach((k) => {
    if (!whiteList.includes(k) && obj[k] !== null) {
      tmp[k] = obj[k];
    }
  });
  return tmp;
};
export function getDefaultSize(size = null, min = 480) {
  if (!size) return { width: 0, height: 0 };
  const { width: oWidth, height: oHeight } = size;
  if (oWidth == oHeight) {
    const tmp = min > oWidth ? oWidth : min;
    return { width: tmp, height: tmp };
  }
  const isVertical = oWidth > oHeight ? false : true;
  let dWidth = 0;
  let dHeight = 0;
  if (isVertical) {
    dHeight = oHeight >= min ? min : oHeight;
    dWidth = (oWidth / oHeight) * dHeight;
  } else {
    dWidth = oWidth >= min ? min : oWidth;
    dHeight = (oHeight / oWidth) * dWidth;
  }
  return { width: dWidth, height: dHeight };
}
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
export const getImageSize = (url) => {
  const size = { width: 0, height: 0 };
  if (!url) return size;
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      size.width = img.width;
      size.height = img.height;
      resolve(size);
    };
    img.onerror = () => {
      resolve(size);
    };
  });
};
export const getInitials = (name) => {
  const arr = name.split(" ").filter((n) => !!n);
  return arr
    .map((t) => t[0])
    .join("")
    .toUpperCase();
};
export const getInitialsAvatar = ({
  initials = "UK",
  initial_size = 0,
  size = 200,
  foreground = "#fff",
  background = "#4c99e9",
  weight = 400,
  fontFamily = "'Lato', 'Lato-Regular', 'Helvetica Neue'"
}) => {
  const canvas = document.createElement("canvas");
  const width = size;
  const height = size;
  const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d");
  context.scale(devicePixelRatio, devicePixelRatio);
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = background;
  context.fill();
  // 两个字符，自动缩放40
  context.font = `${weight} ${
    ((initial_size || height) - (initials.length == 2 ? 40 : 0)) / 2
  }px ${fontFamily}`;
  context.textAlign = "center";

  context.textBaseline = "middle";
  context.fillStyle = foreground;
  context.fillText(initials, width / 2, height / 2);

  /* istanbul ignore next */
  return canvas.toDataURL("image/png");
};
/**
 * @param {File|Blob} - file to slice
 * @param {Number} - chunksAmount
 * @return {Array} - an array of Blobs
 **/
export function sliceFile(file, chunksAmount) {
  if (!file) return null;
  let byteIndex = 0;
  let chunks = [];

  for (let i = 0; i < chunksAmount; i += 1) {
    let byteEnd = Math.ceil((file.size / chunksAmount) * (i + 1));
    chunks.push(file.slice(byteIndex, byteEnd));
    byteIndex += byteEnd - byteIndex;
  }

  return chunks;
}
export const getFileIcon = (type, name = "") => {
  let icon = null;

  const checks = {
    image: /^image/gi,
    audio: /^audio/gi,
    video: /^video/gi,
    code: /(json|javascript|java|rb|c|php|xml|css|html)$/gi,
    doc: /^text/gi,
    pdf: /\/pdf$/gi
  };
  const _arr = name.split(".");
  const _type = type || _arr[_arr.length - 1];
  switch (true) {
    case checks.image.test(_type):
      {
        console.log("image");
        icon = <IconImage className="icon" />;
      }
      break;
    case checks.pdf.test(_type):
      icon = <IconPdf className="icon" />;
      break;
    case checks.code.test(_type):
      icon = <IconCode className="icon" />;
      break;
    case checks.doc.test(_type):
      icon = <IconDoc className="icon" />;
      break;
    case checks.audio.test(_type):
      icon = <IconAudio className="icon" />;
      break;
    case checks.video.test(_type):
      icon = <IconVideo className="icon" />;
      break;

    default:
      icon = <IconUnkown className="icon" />;
      break;
  }
  return icon;
};
export const normalizeArchiveData = (data = null, filePath = null, uid = null) => {
  if (!data || !filePath) return [];
  const { messages, users } = data;
  const getUrls = (uid, { content, content_type, file_id, thumbnail_id, filePath, avatar }) => {
    // uid存在，则favorite，否则archive
    const prefix = uid
      ? `${BASE_URL}/favorite/attachment/${uid}/${filePath}/`
      : `${BASE_URL}/resource/archive/attachment?file_path=${filePath}&attachment_id=`;
    return {
      transformedContent: content_type == ContentTypes.file ? `${prefix}${file_id}` : content,
      thumbnail: content_type == ContentTypes.file ? `${prefix}${thumbnail_id}` : "",
      download:
        content_type == ContentTypes.file
          ? `${prefix}${file_id}${uid ? "?" : "&"}download=true`
          : "",
      avatarUrl: avatar !== null ? `${prefix}${avatar}` : ""
    };
  };
  return messages.map(
    ({ source, mid, content, file_id, thumbnail_id, content_type, properties, from_user }) => {
      let user = { ...(users[from_user] || {}) };
      const { transformedContent, thumbnail, download, avatarUrl } = getUrls(uid, {
        content,
        content_type,
        filePath,
        file_id,
        thumbnail_id,
        avatar: user.avatar
      });

      user.avatar = avatarUrl;

      // console.log("user data", transformedContent, user);
      return {
        source,
        from_mid: mid,
        user,
        content: transformedContent,
        content_type,
        properties,
        download,
        thumbnail
      };
    }
  );
};
