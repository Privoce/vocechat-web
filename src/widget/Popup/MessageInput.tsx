import { ChangeEvent, memo,  useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import IconSend from "@/assets/icons/send.svg";
import IconImage from "@/assets/icons/image.svg";
import useSendMessage from "../../hooks/useSendMessage";
import { useWidget } from "../WidgetContext";
import useUploadFile from "@/hooks/useUploadFile";
import { Wobble } from "@uiball/loaders";
import { getImageSize } from "@/utils";

type Props = {
  from: number;
  to: number;
};
let isComposing = false;
const MessageInput = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading } = useUploadFile();
  const { t } = useTranslation("widget");
  const { color } = useWidget();
  const { from, to } = props;
  const { sendMessage } = useSendMessage({
    from,
    to,
    context: "dm"
  });

  const [content, setContent] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const textareaClassName = clsx(
    "px-2.5 py-1.5 text-sm rounded-md w-full block dark:bg-gray-700 dark:text-gray-100",
    "min-h-[32px] max-h-[92px] h-8 resize-none overflow-y-auto",
    `ring-1 ring-gray-200 dark:ring-gray-800 focus:ring-2 focus:ring-[${color}]`,
    "focus:outline-none"
  );
  const handleSend = () => {
    sendMessage({
      type: "text",
      content
    });
    setContent("");
  };
  const handleImageSelect = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (!files || files?.length == 0) return;
    const [file] = Array.from(files);
    const result = await uploadFile(file);
    if (result) {
      // send message
      const properties: any = await getImageSize(URL.createObjectURL(file));
      console.log("uploaded", result, properties);
      const { path } = result;
      sendMessage({
        ignoreLocal: true,
        type: "file",
        content: { path },
        properties
      });
    }
  };
  // useEffect(() => {
  //   if(uploadSuccess){
  //     inputRef.current.value="";
  //   }

  // }, [uploadSuccess])

  return (
    <div className="relative border-t border-gray-300 dark:border-gray-600 w-full">
      <div className={"px-3 py-2 min-h-[48px] flex items-center gap-2"}>
        <textarea
          // disabled={isSending}
          ref={ref}
          maxLength={4096}
          className={textareaClassName}
          value={content}
          placeholder={t("placeholder_send")}
          onChange={(e) => setContent(e.target.value)}
          onCompositionStart={() => {
            isComposing = true;
          }}
          onCompositionEnd={() => {
            isComposing = false;
          }}
          onInput={() => {
            const element = ref.current;
            if (!element) return;
            element.style.height = "32px";
            // borderTop + borderBottom = 2px
            element.style.height = `${element.scrollHeight + 2}px`;
          }}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.key === "Enter" && !isComposing) {
              // e.stopPropagation();
              e.preventDefault();
              if (content.trim().length === 0) return;
              handleSend();
            }
          }}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleImageSelect}
            disabled={isUploading}
            className="p-1 disabled:opacity-60"
          >
            {isUploading ? (
              <Wobble size={16} />
            ) : (
              <IconImage className="dark:stroke-gray-100 w-4 h-4" />
            )}
            <input
              onChange={handleFileChange}
              accept="image/*"
              ref={inputRef}
              type="file"
              name="image"
              id="image"
              hidden
            />
          </button>
          <button
            onClick={handleSend}
            disabled={content.trim().length === 0}
            className="p-1 disabled:opacity-60"
          >
            <IconSend className="dark:fill-gray-100 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MessageInput);
