import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "rooks";
import Tooltip from "../Tooltip";
import { Picker } from 'emoji-mart';
import SmileIcon from "../../../assets/icons/emoji.smile.svg";
import clsx from "clsx";


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
      const clickEle = evt.target;
      const ignore =
        (clickEle.nodeName == "svg" && clickEle.dataset.emoji == "toggler") ||
        (clickEle.nodeName == "path" && clickEle.parentElement.dataset.emoji == "toggler");
      if (ignore) return;
      setVisible(false);
    },
    visible
  );

  return (
    <Tooltip placement="top" tip="Emojis" disabled={visible}>
      <div className="relative w-fit flex items-center">
        <div ref={ref} className={clsx(`absolute -top-5 -left-5 -translate-y-full`, visible ? 'block' : 'hidden')}>
          {/* emoji picker */}
        </div>
        <SmileIcon data-emoji="toggler" className="cursor-pointer select-none !w-[22px] !h-[22px]" onClick={togglePickerVisible} />
      </div>
    </Tooltip>
  );
}
