import { ReactNode } from "react";
import * as Popover from "@radix-ui/react-popover";

type EmojiPopupProps = {
  control: ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
};

export function EmojiPopup({ control, isOpen, setIsOpen, children }: EmojiPopupProps) {
  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>{control}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          alignOffset={-12}
          sideOffset={20}
          className="z-[100] bg-gray-200 dark:bg-gray-800"
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
