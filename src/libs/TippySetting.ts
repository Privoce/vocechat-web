import tippy, { followCursor } from "tippy.js";

tippy.setDefaultProps({
  duration: 0,
  delay: [0, 0],
  plugins: [followCursor]
});
