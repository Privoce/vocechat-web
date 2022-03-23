// import React from "react";
// import styled from 'styled-components';
import AutoReplace from "slate-auto-replace";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { serialize } from "remark-slate";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Transforms, Editor } from "slate";
import { withHistory } from "slate-history";
import { useKey } from "rooks";
import Styled from "./styled";

import initialValue, { emptyValue } from "./initialValue";
import Element from "./Element";
// import withShortcuts from "./withShortcuts";

// Add the plugin to your set of plugins...
const plugins = [
  AutoReplace({
    trigger: "space",
    before: /^(>)$/,
    change: (change, e, matches) => {
      return change.setBlocks({ type: "blockquote" });
    },
  }),
];

export default function RichInput({
  setEditor,
  placeholder = "Write some markdown...",
  updateMarkdown,
  updatePureText,
  sendMessage,
}) {
  const editableRef = useRef(null);
  const [shift, setShift] = useState(false);
  const [value, setValue] = useState(emptyValue);
  // const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  // const editor = useMemo(
  //   () => withShortcuts(withReact(withHistory(createEditor()))),
  //   []
  // );
  useEffect(() => {
    setEditor(editor);
  }, []);

  useKey(
    "Enter",
    (evt) => {
      evt.preventDefault();

      sendMessage();
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });
    },
    {
      target: editableRef,
      when: !shift,
    }
  );
  useKey(
    "Shift",
    (e) => {
      console.log("shift", e.type);
      setShift(e.type == "keydown");
    },
    { eventTypes: ["keydown", "keyup"], target: editableRef }
  );
  const handleChange = useCallback(
    (nextValue) => {
      setValue(nextValue);
      // serialize slate state to a markdown string
      const md = nextValue.map((v) => serialize(v)).join("\n");
      updateMarkdown(md);
      console.log("serialized", nextValue, md);

      const nonParagraphs = nextValue.filter((v) => v.type != "paragraph");
      if (nonParagraphs.length == 0) {
        const nonEmptyPs = nextValue.filter((v) => !!v.children[0].text);
        // 全部是P
        const pureText = nonEmptyPs
          .map((v) => {
            return v.children.map(({ text }) => text).join("");
          })
          .join("\n");
        console.log("pure text", nonEmptyPs, pureText);
        updatePureText(pureText);
      } else {
        updatePureText("");
      }
    },
    [updateMarkdown, updatePureText]
  );

  console.log("slate value", value);
  return (
    <Styled className="input" ref={editableRef}>
      <Slate
        editor={editor}
        plugins={plugins}
        value={value}
        onChange={handleChange}
      >
        <Editable
          // plugins={plugins}
          renderElement={Element}
          placeholder={placeholder}
          spellCheck
          autoFocus
        />
      </Slate>
    </Styled>
  );
}
