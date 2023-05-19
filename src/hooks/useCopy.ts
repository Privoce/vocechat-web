import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { copyImageToClipboard } from "copy-image-clipboard";

const useCopy = (config: { enableToast: boolean } | void) => {
  const { enableToast = true } = config || {};

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied && enableToast) {
      toast.success("Copied!");
    }
  }, [copied]);

  const copyToClipboard = (str: string) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selection = document.getSelection();
    if (!selection) return false;
    const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
    el.select();
    const success = document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      selection.removeAllRanges();
      selection.addRange(selected);
    }
    return success;
  };

  const copy = (text: string, isImage = false) => {
    let inter = 0;
    if (!copied) {
      if (!isImage) {
        setCopied(copyToClipboard(text));
        inter = window.setTimeout(() => {
          setCopied(false);
        }, 500);
      } else {
        copyImageToClipboard(text).then(() => {
          setCopied(true);
          inter = window.setTimeout(() => {
            setCopied(false);
          }, 500);
        });
      }
    }
    return () => {
      clearTimeout(inter);
    };
  };

  return { copied, copy };
};

export default useCopy;
