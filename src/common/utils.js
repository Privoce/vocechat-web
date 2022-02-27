export const isObjectEqual = (obj1, obj2) => {
  let o1 = Object.entries(obj1).sort().toString();
  let o2 = Object.entries(obj2).sort().toString();
  return o1 === o2;
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
  fontFamily = "'Lato', 'Lato-Regular', 'Helvetica Neue'",
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
  context.font = `${weight} ${initial_size || height / 2}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = foreground;
  context.fillText(initials, width / 2, height / 2);

  /* istanbul ignore next */
  return canvas.toDataURL("image/png");
};
