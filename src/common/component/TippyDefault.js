import tippy, { followCursor } from "tippy.js";

export default function TippyDefault() {
  tippy.setDefaultProps({
    duration: 0,
    delay: [0, 0],
    plugins: [followCursor]
  });
  return null;
}
