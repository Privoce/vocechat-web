import React from 'react';
import {
  Emoji,
  EmojiDropdownMenuOptions,
  useEmojiDropdownMenuState,
} from '@udecode/plate-emoji';
import IconSmile from '@/assets/icons/emoji.smile.svg'
import { EmojiPopup } from './emoji-popup';

import { emojiCategoryIcons, emojiSearchIcons } from './emoji-icons';
import { EmojiPicker } from './emoji-picker';

type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions;
}&{
  onSelectEmoji?: (emoji: Emoji) => void;
};

export function EmojiDropdownInput({
  options,
  onSelectEmoji,
  ...props
}: EmojiDropdownMenuProps) {
  const { isOpen, setIsOpen, emojiPickerState } =
    useEmojiDropdownMenuState(options);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const rest=onSelectEmoji?{onSelectEmoji}:{}
  return (
    <EmojiPopup
      control={
        <button className="relative h-6 w-6" onClick={handleClick} {...props}>
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
          search: emojiSearchIcons,
        }}
        settings={options?.settings}
       {...rest}
      />
    </EmojiPopup>
  );
}
