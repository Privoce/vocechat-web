import React from "react";
import { UseEmojiPickerType } from "@udecode/plate-emoji";
import IconSearch from "@/assets/icons/search.svg";
import IconClose from "@/assets/icons/close.circle.svg";
import { cn } from "@/utils";

export type EmojiPickerSearchAndClearProps = Pick<
  UseEmojiPickerType,
  "i18n" | "searchValue" | "clearSearch"
>;

export function EmojiPickerSearchAndClear({
  i18n,
  searchValue,
  clearSearch
}: EmojiPickerSearchAndClearProps) {
  return (
    <>
      <span className={cn("absolute left-2 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2")}>
        <IconSearch className="w-full h-full" />
      </span>
      {searchValue && (
        <button
          title={i18n.clear}
          aria-label="Clear"
          type="button"
          className={cn(
            "absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer border-none bg-transparent justify-center items-center"
          )}
          onClick={clearSearch}
        >
          <IconClose className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
