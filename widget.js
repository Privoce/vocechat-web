let {
  hostId = 1,
  closeWidth = 48,
  closeHeight = 48,
  openWidth = 380,
  openHeight = 680,
  themeColor = "#1fe1f9",
  position = "right",
  welcome = ""
} = document.currentScript.dataset;
let _src = document.currentScript.src;
let wrapper = document.createElement("iframe");
wrapper.id = "VOCECHAT_WIDGET";
let styles = {
  position: "fixed",
  borderRadius: "8px",
  right: "16px",
  [position]: "16px", // [position] = [right] or [left]
  bottom: "16px",
  border: "none",
  zIndex: 9999,
  boxShadow: `rgb(0 0 0 / 25%) 0px 25px 50px -12px`
};
Object.assign(wrapper.style, styles);
wrapper.src = `${new URL(_src).origin}/widget.html?host=${hostId}&themeColor=${encodeURIComponent(
  themeColor
)}&from=${encodeURIComponent(location.hostname)}&welcome=${encodeURIComponent(welcome)}`;
wrapper.width = closeWidth;
wrapper.height = closeHeight;
wrapper.frameborder = 0;
window.addEventListener(
  "message",
  (event) => {
    const { data: CMD } = event;
    switch (CMD) {
      case "OPEN":
        wrapper.setAttribute("width", openWidth);
        wrapper.setAttribute("height", openHeight);
        break;
      case "CLOSE":
        wrapper.setAttribute("width", closeWidth);
        wrapper.setAttribute("height", closeHeight);
        break;
      case "RELOAD_WITH_OPEN":
        {
          const url = new URL(wrapper.src);
          url.searchParams.append("open", new Date().getTime());
          console.log("new src", url.href);
          wrapper.src = url.href;
          wrapper.setAttribute("width", openWidth);
          wrapper.setAttribute("height", openHeight);
        }
        break;
      default:
        break;
    }
  },
  false
);
document.body.appendChild(wrapper);
