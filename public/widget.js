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
    popupClosable = "true",
    showPopup = "true",
    useShadowDom = "false"
  } = d.currentScript.dataset;
  const _src = d.currentScript.src;
  const origin = new URL(_src).origin;

  // 如果有提示框内容，关闭状态的宽度和高度需要更大
  const hasTooltip = popupTitle || popupSubtitle;
  const actualCloseWidth = hasTooltip ? 320 : closeWidth;
  const actualCloseHeight = hasTooltip ? 120 : closeHeight;

  const baseStyles = {
    position: "fixed",
    [position]: "16px", // [position] = [right] or [left]
    bottom: "16px",
    border: "none",
    zIndex: 9999
  };

  if (useShadowDom === "true") {
    // Shadow DOM 模式 - 直接注入内容
    const container = d.createElement("div");
    container.id = "VOCECHAT_WIDGET_CONTAINER";
    Object.assign(container.style, baseStyles);
    // 不限制容器大小，让内容自己决定
    container.style.pointerEvents = "none"; // 容器本身不响应点击，让点击穿透

    const shadowRoot = container.attachShadow({ mode: "open" });

    // 创建根容器
    const rootDiv = d.createElement("div");
    rootDiv.id = "root";
    rootDiv.style.background = "transparent";
    rootDiv.style.pointerEvents = "auto"; // 内容可以响应点击

    // 创建 modal 容器
    const modalDiv = d.createElement("div");
    modalDiv.id = "root-modal";

    shadowRoot.appendChild(rootDiv);
    shadowRoot.appendChild(modalDiv);

    d.body.appendChild(container);

    // 先加载 asset manifest 获取正确的文件路径
    fetch(`${origin}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        // 加载样式
        const styleLink = d.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.href = `${origin}${manifest.files["widget.css"]}`;
        shadowRoot.appendChild(styleLink);

        // 加载并执行 widget 脚本
        const script = d.createElement("script");
        script.type = "text/javascript";
        script.src = `${origin}${manifest.files["widget.js"]}`;
        script.onload = () => {
          // 脚本加载完成后，需要手动初始化 React 应用到 shadow DOM
          // 检测父窗口是否为移动端
          const isMobile = w.innerWidth < 768;
          const params = new URLSearchParams({
            id,
            host: hostId,
            autoReg,
            token: loginToken,
            themeColor,
            from: location.hostname,
            welcome,
            title,
            logo,
            popupTitle,
            popupSubtitle,
            popupImage,
            popupClosable,
            showPopup,
            embed: "true",
            closeWidth,
            closeHeight,
            openWidth,
            openHeight,
            isMobile
          });

          // 将参数传递给 shadow DOM 内的应用
          if (w.VoceChatWidgetInit) {
            w.VoceChatWidgetInit(shadowRoot, params.toString());
          }
        };
        shadowRoot.appendChild(script);
      })
      .catch(err => {
        console.error("Failed to load widget manifest:", err);
      });

    // 暴露全局函数用于打开 widget（简化版，只触发事件）
    w.VoceChatWidget = {
      open: function() {
        const event = new CustomEvent("vocechat-widget-open");
        shadowRoot.dispatchEvent(event);
      },
      close: function() {
        const event = new CustomEvent("vocechat-widget-close");
        shadowRoot.dispatchEvent(event);
      },
      toggle: function() {
        const event = new CustomEvent("vocechat-widget-toggle");
        shadowRoot.dispatchEvent(event);
      }
    };
  } else {
    // 传统 iframe 模式
    const wrapper = d.createElement("iframe");
    wrapper.id = "VOCECHAT_WIDGET";
    Object.assign(wrapper.style, baseStyles);
    // 检测父窗口是否为移动端
    const isMobile = w.innerWidth < 768;
    wrapper.src = `${origin}/widget.html?id=${id}&host=${hostId}&autoReg=${autoReg}&token=${loginToken}&themeColor=${encodeURIComponent(
      themeColor
    )}&from=${encodeURIComponent(location.hostname)}&welcome=${encodeURIComponent(welcome)}&title=${encodeURIComponent(title)}&logo=${encodeURIComponent(logo)}&popupTitle=${encodeURIComponent(popupTitle)}&popupSubtitle=${encodeURIComponent(popupSubtitle)}&popupImage=${encodeURIComponent(popupImage)}&popupClosable=${popupClosable}&showPopup=${showPopup}&isMobile=${isMobile}`;
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
  }
})(window, document);
