const {
  domain = location.origin,
  hostId = 1,
  closeWidth = 52,
  closeHeight = 52,
  openWidth = 600,
  openHeight = 800
} = document.currentScript.dataset;
const wrapper = document.createElement("iframe");
const styles = {
  position: "fixed",
  right: "15px",
  bottom: "15px",
  border: "none",
  zIndex: 9999
};
Object.assign(wrapper.style, styles);
wrapper.src = `${domain}/widget.html?host=${hostId}`;
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
      default:
        break;
    }
  },
  false
);
document.body.appendChild(wrapper);
