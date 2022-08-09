import React, { FC, useEffect, useRef, useState } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState, Selection } from "prosemirror-state";
import { DOMParser, DOMSerializer, Node } from "prosemirror-model";
import "./editor.css";
import Toolbar from "./toolbar";
import AutocompleteContainer from "./plugin/autocomplete/container";
import schema from "./schema";
import plugins from "./plugin";

interface Props {
  html: string;
  json?: any;
  autofocus?: boolean;
  placeholder?: string;
  onChangeHtml?: (html: string) => void;
  onChangeJson?: (json: any) => void;
}

const Index: FC<Props> = ({ html, autofocus, onChangeHtml, onChangeJson }) => {
  const [view, setView] = useState<EditorView | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const onChangeHtmlRef = useRef(onChangeHtml);
  const onChangeJsonRef = useRef(onChangeJson);

  useEffect(() => {
    onChangeHtmlRef.current = onChangeHtml;
    onChangeJsonRef.current = onChangeJson;
  }, [onChangeHtml, onChangeJson]);

  useEffect(() => {
    if (!ref.current) return;
    const serializer = new XMLSerializer();

    const getHtml = (s: EditorState): string => {
      const html = DOMSerializer.fromSchema(schema).serializeFragment(s.doc.content);
      return serializer.serializeToString(html);
    };

    const setHtml = (html: string): Node => {
      const element = document.createElement("div");
      element.innerHTML = html;
      return DOMParser.fromSchema(schema).parse(element);
    };

    const getJson = (s: EditorState): any => s.toJSON();

    const editorState = EditorState.create({ plugins, doc: setHtml(html) });
    const editorView = new EditorView(ref.current, {
      state: editorState,
      dispatchTransaction(tr) {
        const newState = editorView.state.apply(tr);
        onChangeHtmlRef.current?.(getHtml(newState));
        onChangeJsonRef.current?.(getJson(newState));
        editorView.updateState(newState);
      }
    });

    // 在初始化时聚焦，计算 tr，保证 blockIndex 插件被触发一次
    if (autofocus) editorView.focus();
    const { tr } = editorView.state;
    tr.setSelection(Selection.atStart(tr.doc));
    editorView.dispatch(tr);
    setView(editorView);

    return () => {
      setView(null);
      editorView.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="bg-content cursor-text border-primary rounded-lg min-h-[160px] w-[680px]"
      onClick={(e) => {
        e.stopPropagation();
        if (e.target !== e.currentTarget) return;
        view?.focus();
      }}
    >
      <Toolbar view={view} schema={schema} />
      <div ref={ref} className="editor-body" spellCheck={false} />
      <AutocompleteContainer />
    </div>
  );
};

export default Index;
