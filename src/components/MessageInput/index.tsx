import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useKey } from "rooks";
import { createEditor, Descendant, Editor, Range, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, useSlate, withReact } from "slate-react";

import { isMobile } from "@/utils";
import { CHARACTERS, Element, Leaf, Portal, serialize } from "./components";
import { MentionElement } from "./mention";

const insertMention = (editor: Editor, character: string) => {
  const mention: MentionElement = {
    type: "mention",
    character,
    children: [{ text: "" }]
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const withMentions = (editor: Editor) => {
  const { isInline, isVoid, markableVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.type === "mention" || markableVoid(element);
  };

  return editor;
};
const initialEditorValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }]
  }
];
type Props = {
  id: string;
  placeholder: string;
  updateMessages: any;
  sendMessages: any;
};
let currentEditor: ReactEditor | null = null;
const MessageInput = ({ id, placeholder, updateMessages, sendMessages }: Props) => {
  const editableRef = useRef<HTMLDivElement>();
  const ref = useRef<HTMLDivElement | undefined>();
  const [target, setTarget] = useState<Range | undefined>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withMentions(withReact(withHistory(createEditor()))), []);
  currentEditor = editor as ReactEditor;
  const chars = CHARACTERS.filter((c) => c.toLowerCase().startsWith(search.toLowerCase())).slice(
    0,
    10
  );

  const onKeyDown = useCallback(
    (event) => {
      if (target && chars.length > 0) {
        switch (event.key) {
          case "ArrowDown": {
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          }
          case "ArrowUp": {
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          }
          case "Tab":
          case "Enter": {
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(undefined);
            break;
          }
          case "Escape": {
            event.preventDefault();
            setTarget(undefined);
            break;
          }
        }
      }
    },
    [chars, editor, index, target]
  );

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars.length, editor, index, search, target]);

  useKey(
    "Enter",
    (evt) => {
      console.log("senddddd", currentEditor);

      if (!currentEditor) return;
      // 是否在at操作
      //   const mentionInputs = findMentionInput(plateEditor);
      //   if (mentionInputs || evt.shiftKey || evt.ctrlKey || evt.altKey || evt.isComposing) {
      //     return true;
      //   }
      if (evt.shiftKey || evt.ctrlKey || evt.altKey || evt.isComposing) {
        return true;
      }
      evt.preventDefault();
      const serialized = serialize(currentEditor.children);
      console.log("slate changed", serialized);
      if (!serialized.trim()) return true;
      // return true;
      sendMessages();
    },
    {
      when: !isMobile(),
      target: editableRef
    }
  );
  return (
    <div
      className="input w-full pr-14 md:pr-0 max-h-[50vh] overflow-auto text-sm text-gray-600 dark:text-white"
      ref={editableRef}
    >
      <Slate
        key={id}
        editor={editor}
        initialValue={initialEditorValue}
        onChange={(values) => {
          const { selection } = editor;
          const serialized = serialize(values);
          if (serialized.trim()) {
            updateMessages([
              {
                type: "text",
                content: serialized
              }
            ]);
          }
          if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = Editor.before(editor, start, { unit: "word" });
            const before = wordBefore && Editor.before(editor, wordBefore);
            const beforeRange = before && Editor.range(editor, before, start);
            const beforeText = beforeRange && Editor.string(editor, beforeRange);
            const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
            const after = Editor.after(editor, start);
            const afterRange = Editor.range(editor, start, after);
            const afterText = Editor.string(editor, afterRange);
            const afterMatch = afterText.match(/^(\s|$)/);

            if (beforeMatch && afterMatch) {
              setTarget(beforeRange);
              setSearch(beforeMatch[1]);
              setIndex(0);
              return;
            }
          }

          setTarget(undefined);
        }}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="focus:outline-none"
        />
        {target && chars.length > 0 && (
          <Portal>
            <div
              ref={ref}
              style={{
                top: "-9999px",
                left: "-9999px",
                position: "absolute",
                zIndex: 1,
                padding: "3px",
                background: "white",
                borderRadius: "4px",
                boxShadow: "0 1px 5px rgba(0,0,0,.2)"
              }}
              data-cy="mentions-portal"
            >
              {chars.map((char, i) => (
                <div
                  key={char}
                  onClick={() => {
                    Transforms.select(editor, target);
                    insertMention(editor, char);
                    setTarget(undefined);
                  }}
                  style={{
                    padding: "1px 3px",
                    borderRadius: "3px",
                    background: i === index ? "#B4D5FF" : "transparent"
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          </Portal>
        )}
      </Slate>
    </div>
  );
};

export default MessageInput;

export const useMessageInput = () => {
  const editor = currentEditor;
  const focus = () => {
    if (editor) {
      ReactEditor.focus(editor);
    }
  };
  const insertText = (txt: string) => {
    // console.log("eref", editor);
    if (editor) {
      ReactEditor.focus(editor);
      editor.insertText(txt);
    }
  };
  const resetInput = () => {
    if (!editor) return;
    // 清空
    const point = { path: [0, 0], offset: 0 };
    editor.selection = { anchor: point, focus: point };
    editor.history = { redos: [], undos: [] };
    editor.children = initialEditorValue;
  };
  return {
    resetInput,
    focus,
    insertText
  };
};
