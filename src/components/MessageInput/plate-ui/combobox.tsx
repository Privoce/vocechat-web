import { useEffect, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  comboboxActions,
  ComboboxContentItemProps,
  ComboboxContentProps,
  ComboboxProps,
  Data,
  NoData,
  TComboboxItem,
  useActiveComboboxStore,
  useComboboxContent,
  useComboboxContentState,
  useComboboxControls,
  useComboboxItem,
  useComboboxSelectors
} from "@udecode/plate-combobox";
import { useEditorState, useEventEditorSelectors } from "@udecode/plate-common";
import { createVirtualRef } from "@udecode/plate-floating";

import { cn } from "@/utils";
import { ViewportList } from "react-viewport-list";

export function ComboboxItem<TData extends Data = NoData>({
  combobox,
  index,
  item,
  onRenderItem
}: ComboboxContentItemProps<TData>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { props } = useComboboxItem({ item, index, combobox, onRenderItem });

  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none ml-1 my-1 transition-colors",
        "hover:bg-gray-300/50 dark:hover:bg-gray-500/50 hover:text-gray-500 data-[highlighted=true]:bg-gray-300/50 dark:data-[highlighted=true]:bg-gray-500/50 data-[highlighted=true]:text-gray-500"
      )}
      {...props}
    />
  );
}

export function ComboboxContent<TData extends Data = NoData>(props: ComboboxContentProps<TData>) {
  const { component: Component, items, portalElement, combobox, onRenderItem } = props;
  const wrapperRef = useRef(null);

  const editor = useEditorState();

  const filteredItems = useComboboxSelectors.filteredItems() as TComboboxItem<TData>[];
  const activeComboboxStore = useActiveComboboxStore()!;

  const state = useComboboxContentState({ items, combobox });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { menuProps, targetRange } = useComboboxContent(state);

  return (
    <Popover.Root open>
      <Popover.PopoverAnchor virtualRef={createVirtualRef(editor, targetRange ?? undefined)} />

      <Popover.Portal container={portalElement}>
        <Popover.Content
          {...menuProps}
          sideOffset={5}
          side="bottom"
          align="start"
          className={cn(
            "z-[500] m-0 max-h-[400px] w-[200px] overflow-x-hidden overflow-y-scroll rounded-md bg-slate-100 dark:bg-slate-900 py-2 shadow-md"
          )}
          onOpenAutoFocus={(event) => event.preventDefault()}
          ref={wrapperRef}
        >
          {Component ? Component({ store: activeComboboxStore }) : null}
          <ViewportList initialPrerender={15} viewportRef={wrapperRef} items={filteredItems}>
            {(item, idx) => {
              return (
                <ComboboxItem
                  key={item.key}
                  item={item}
                  combobox={combobox}
                  index={idx}
                  onRenderItem={onRenderItem}
                />
              );
            }}
          </ViewportList>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

/**
 * Register the combobox id, trigger, onSelectItem
 * Renders the combobox if active.
 */
export function Combobox<TData extends Data = NoData>({
  id,
  trigger,
  searchPattern,
  onSelectItem,
  controlled,
  maxSuggestions,
  filter,
  sort,
  disabled: _disabled,
  ...props
}: ComboboxProps<TData>) {
  const storeItems = useComboboxSelectors.items();
  const disabled = _disabled ?? (storeItems.length === 0 && !props.items?.length);

  const focusedEditorId = useEventEditorSelectors.focus?.();
  const combobox = useComboboxControls();
  const activeId = useComboboxSelectors.activeId();
  const editor = useEditorState();

  useEffect(() => {
    comboboxActions.setComboboxById({
      id,
      trigger,
      searchPattern,
      controlled,
      onSelectItem,
      maxSuggestions,
      filter,
      sort
    });
  }, [id, trigger, searchPattern, controlled, onSelectItem, maxSuggestions, filter, sort]);

  if (
    !combobox ||
    !editor.selection ||
    focusedEditorId !== editor.id ||
    activeId !== id ||
    disabled
  ) {
    return null;
  }

  return <ComboboxContent combobox={combobox} {...props} />;
}
