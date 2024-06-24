// IIFC
((w, d) => {
  const {
    id = "",
    hostId = 1,
    autoReg = "true",
    loginToken = "",
    closeWidth = 48,
    closeHeight = 48,
    openWidth = 380,
    openHeight = 680,
    themeColor = "#1fe1f9",
    position = "right",
    welcome = ""
  } = d.currentScript.dataset;
  const _src = d.currentScript.src;
  const wrapper = d.createElement("iframe");
  wrapper.id = "VOCECHAT_WIDGET";
  const styles = {
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
  wrapper.src = `${
    new URL(_src).origin
  }/widget.html?id=${id}&host=${hostId}&autoReg=${autoReg}&token=${loginToken}&themeColor=${encodeURIComponent(
    themeColor
  )}&from=${encodeURIComponent(location.hostname)}&welcome=${encodeURIComponent(welcome)}`;
  wrapper.width = closeWidth;
  wrapper.height = closeHeight;
  wrapper.frameborder = 0;
  w.addEventListener(
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
  d.body.appendChild(wrapper);
})(window, document);
