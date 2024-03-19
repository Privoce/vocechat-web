import { Emoji, EmojiDropdownMenuOptions, useEmojiDropdownMenuState } from "@udecode/plate-emoji";
import IconSmile from "@/assets/icons/emoji.smile.svg";
import { EmojiPopup } from "./emoji-popup";

import { emojiCategoryIcons, emojiSearchIcons } from "./emoji-icons";
import { EmojiPicker } from "./emoji-picker";
import { Plate } from "@udecode/plate-common";

type EmojiDropdownMenuProps = {
  context?: "markdown" | "plate";
  options?: EmojiDropdownMenuOptions;
} & {
  onSelectEmoji?: (emoji: Emoji) => void;
};

const PickerWrapper = (props: EmojiDropdownMenuProps) => {
  const { options, onSelectEmoji, ...others } = props;
  const { isOpen, setIsOpen, emojiPickerState } = useEmojiDropdownMenuState(options);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const rest = onSelectEmoji ? { onSelectEmoji } : {};
  return (
    <Plate key={"just_for_emoji_picker"}>
      <EmojiPopup
        control={
          <button className="relative h-6 w-6" onClick={handleClick} {...others}>
            <IconSmile className="w-full h-full" />
          </button>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <EmojiPicker
          {...emojiPickerState}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          icons={{
            categories: emojiCategoryIcons,
            search: emojiSearchIcons
          }}
          settings={options?.settings}
          {...rest}
        />
      </EmojiPopup>
    </Plate>
  );
};

export function EmojiInputPicker({ context, ...props }: EmojiDropdownMenuProps) {
  if (context === "markdown")
    return (
      <Plate key={"just_for_emoji_picker"}>
        <PickerWrapper {...props} />
      </Plate>
    );
  return <PickerWrapper {...props} />;
}
