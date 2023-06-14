import { useEffect, useRef } from "react";
import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { DOMSerializer } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import autocompletePlugin from "./plugins/autocomplete";
import { defaultOptions } from "./plugins/autocomplete/constants";
import AutocompleteContainer from "./plugins/autocomplete/container";
import placeholderPlugin from "./plugins/placeholder";

const serializer = new XMLSerializer();

const getHtml = (s: EditorState): string => {
  const newHtml = DOMSerializer.fromSchema(schema).serializeFragment(s.doc.content);
  return serializer.serializeToString(newHtml);
};
type Props = {
  sendMessage: any;
  placeholder?: string;
  id: string;
};
let editorView: EditorView | undefined = undefined;
const ProseMirrorInput = ({ id, placeholder = "Type somethings...", sendMessage }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!editorRef.current) return;
    let state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap({
          "Mod-z": undo,
          "Mod-y": redo,
          Enter: (state) => {
            const obj = state.doc.toJSON();
            const html = getHtml(state);
            console.log("enter inputs", obj, html);
            // // todo 组合成需要的数据结构，然后发送
            // const transformed=xxxx
            sendMessage([
              {
                type: "text",
                content: state.doc.textContent
              }
            ]);
            // clear
            state.tr.delete(0, state.doc.content.size);
          }
        }),
        keymap(baseKeymap),
        placeholderPlugin(placeholder),
        ...autocompletePlugin(defaultOptions)
      ]
    });
    editorView = new EditorView(editorRef.current, { state });
    // 去掉prosemirror的样式
    editorView.dom.classList.remove("ProseMirror");
    editorView.dom.style.outline = "none";
    editorView.focus();
    // editorView.state.doc.content.append("<span>dd</span>");
    return () => {
      editorView?.destroy();
    };
  }, [placeholder]);

  return (
    <>
      <div
        key={id}
        className="input w-full pr-14 md:pr-0 max-h-[50vh] overflow-auto text-sm text-gray-600 dark:text-white"
        spellCheck={false}
        ref={editorRef}
      ></div>
      <AutocompleteContainer />
    </>
  );
};

export default ProseMirrorInput;

export const useProseMirrorInput = () => {
  const editor = editorView;
  const focus = () => {
    if (editor) {
      editor.focus();
    }
  };
  const insertText = (txt: string) => {
    // console.log("eref", editor);
    if (editor) {
      editor.focus();
      editor.dispatch(editor.state.tr.insertText(txt));
    }
  };
  const resetInput = () => {
    if (!editor) return;
    // 清空
    // editor.dom.innerHTML = "";
    const { state } = editor;
    const tr = state.tr;
    tr.delete(0, editor.state.doc.content.size);
    const newState = state.apply(tr);
    editor.updateState(newState);
  };
  return {
    resetInput,
    focus,
    insertText
  };
};
