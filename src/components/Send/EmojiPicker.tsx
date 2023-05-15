import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "rooks";
import clsx from "clsx";
import { Picker } from 'emoji-mart';

import Tooltip from "../Tooltip";
import SmileIcon from "@/assets/icons/emoji.smile.svg";


export default function EmojiPicker({ selectEmoji }: { selectEmoji: (e: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const togglePickerVisible = () => {
    setVisible((prev) => !prev);
  };
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.innerHTML = "";
      new Picker({
        data: async () => {
          const response = await fetch(
            'https://cdn.jsdelivr.net/npm/@emoji-mart/data',
          );

          return response.json();
        },
        parent: ref.current,
        onEmojiSelect: (item) => {
          console.log("eee333", item);

          selectEmoji(item.native);
        },
        // onClickOutside: () => {
        //   setVisible(false);
        // }
      });
    }
  }, [selectEmoji]);

  useOutsideClick(
    ref,
    (evt) => {
      const clickEle = evt.target as HTMLElement | null;
      if (!clickEle) return;
      const ignore =
        (clickEle.nodeName == "svg" && clickEle.dataset.emoji == "toggler") ||
        (clickEle.nodeName == "path" && clickEle.parentElement && clickEle.parentElement.dataset.emoji == "toggler");
      if (ignore) return;
      setVisible(false);
    },
    visible
  );

  return (
    <Tooltip placement="top" tip="Emojis" disabled={visible}>
      <div className="hidden md:flex relative w-fit items-center">
        <div ref={ref} className={clsx(`z-50 absolute -top-5 -left-5 -translate-y-full`, visible ? 'block' : 'hidden')}>
          {/* emoji picker */}
        </div>
        <SmileIcon data-emoji="toggler" className="cursor-pointer select-none !w-[22px] !h-[22px]" onClick={togglePickerVisible} />
      </div>
    </Tooltip>
  );
}
