import { useState, useEffect } from "react";
import { copyImageToClipboard } from "copy-image-clipboard";
import toast from "react-hot-toast";

const useCopy = (config) => {
  const { enableToast = true } = config || {};

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied && enableToast) {
      toast.success("Copied!");
    }
  }, [copied]);

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    const success = document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    return success;
  };

  const copy = (text, isImage = false) => {
    let inter = 0;
    console.log("copy", text, isImage);
    if (!copied) {
      if (!isImage) {
        setCopied(copyToClipboard(text));
        inter = setTimeout(() => {
          setCopied(false);
        }, 500);
      } else {
        copyImageToClipboard(text).then(() => {
          setCopied(true);
          inter = setTimeout(() => {
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
