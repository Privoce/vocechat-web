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
    title = "",
    logo = "",
    position = "right",
    welcome = "",
    popupTitle = "Need help?",
    popupSubtitle = "Our staff are always ready to help!",
    popupImage = "",
    popupClosable = "true"
  } = d.currentScript.dataset;
  const _src = d.currentScript.src;
  const wrapper = d.createElement("iframe");
  wrapper.id = "VOCECHAT_WIDGET";

  // 如果有提示框内容，关闭状态的宽度和高度需要更大
  const hasTooltip = popupTitle || popupSubtitle;
  const actualCloseWidth = hasTooltip ? 320 : closeWidth;
  const actualCloseHeight = hasTooltip ? 120 : closeHeight;

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
  )}&from=${encodeURIComponent(location.hostname)}&welcome=${encodeURIComponent(welcome)}&title=${encodeURIComponent(title)}&logo=${encodeURIComponent(logo)}&popupTitle=${encodeURIComponent(popupTitle)}&popupSubtitle=${encodeURIComponent(popupSubtitle)}&popupImage=${encodeURIComponent(popupImage)}&popupClosable=${popupClosable}`;
  wrapper.width = actualCloseWidth;
  wrapper.height = actualCloseHeight;
  wrapper.frameborder = 0;
  wrapper.referrerPolicy = "unsafe-url";
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
          wrapper.setAttribute("width", actualCloseWidth);
          wrapper.setAttribute("height", actualCloseHeight);
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

  // 暴露全局函数用于打开 widget
  w.VoceChatWidget = {
    open: function() {
      wrapper.setAttribute("width", openWidth);
      wrapper.setAttribute("height", openHeight);
      wrapper.contentWindow?.postMessage("OPEN_FROM_PARENT", "*");
    },
    close: function() {
      wrapper.setAttribute("width", actualCloseWidth);
      wrapper.setAttribute("height", actualCloseHeight);
      wrapper.contentWindow?.postMessage("CLOSE_FROM_PARENT", "*");
    },
    toggle: function() {
      const currentWidth = wrapper.getAttribute("width");
      if (currentWidth == actualCloseWidth) {
        this.open();
      } else {
        this.close();
      }
    }
  };
})(window, document);
