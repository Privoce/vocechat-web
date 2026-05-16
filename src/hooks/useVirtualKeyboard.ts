import { useEffect } from "react";

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/**
 * Listens to the VisualViewport API and writes the visible height as a CSS
 * custom property (`--vh-visible`) on `document.documentElement`.
 *
 * On Android mobile browsers the virtual keyboard shrinks the visual viewport
 * while `100vh` still refers to the full layout viewport, which causes
 * bottom-pinned elements (like the chat input) to be hidden behind the
 * keyboard or the browser chrome.
 *
 * iOS Safari handles this natively via scroll-into-view behaviour and
 * `-webkit-fill-available`, so we skip it there to avoid the container
 * being over-shrunk when the keyboard opens.
 */
export default function useVirtualKeyboard() {
  useEffect(() => {
    if (isIOS()) return;

    const vv = window.visualViewport;

    function update() {
      const height = vv ? vv.height : window.innerHeight;
      document.documentElement.style.setProperty("--vh-visible", `${height}px`);
    }

    update();

    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    } else {
      window.addEventListener("resize", update);
    }

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
        vv.removeEventListener("scroll", update);
      } else {
        window.removeEventListener("resize", update);
      }
    };
  }, []);
}
