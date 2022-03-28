import { useRef, useState, useCallback } from "react";
import { useKey } from "rooks";
import { Editor, Transforms } from "slate";
import {
  createPlateUI,
  Plate,
  createExitBreakPlugin,
  createTrailingBlockPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createImagePlugin,
  createSoftBreakPlugin,
  createPlugins,
  ELEMENT_PARAGRAPH,
  getPlateActions,
  // usePlateEditorRef,
  ELEMENT_IMAGE,
  // usePlateStore
} from "@udecode/plate";
import Styled from "./styled";
import ImageElement from "./ImageElement";
import { CONFIG } from "./config";

export const TEXT_EDITOR_PREFIX = "rustchat_text_editor";

let components = createPlateUI({
  [ELEMENT_IMAGE]: ImageElement,
  // customize your components by plugin key
});

const initialValue = [{ type: ELEMENT_PARAGRAPH, children: [{ text: "" }] }];
const Plugins = ({
  id = "",
  placeholder = "Write some markdown...",
  sendMessages,
}) => {
  // const plateEditor = usePlateEditorRef(`${TEXT_EDITOR_PREFIX}_${id}`);
  const [msgs, setMsgs] = useState([]);
  const [cmdKey, setCmdKey] = useState(false);
  const editableRef = useRef(null);
  // const editor = useEditorRef();
  const initialProps = {
    ...CONFIG.editableProps,
    className: "box",
    placeholder,
  };
  useKey(
    "Enter",
    (evt) => {
      console.log("enter keypress", evt);
      if (evt.shiftKey || evt.ctrlKey || evt.altKey || evt.isComposing) {
        return true;
      }
      evt.preventDefault();
      sendMessages(msgs);
      // 清空
      const plateEditor = getPlateActions(`${TEXT_EDITOR_PREFIX}_${id}`).editor;
      Transforms.delete(plateEditor, {
        at: {
          anchor: Editor.start(plateEditor, []),
          focus: Editor.end(plateEditor, []),
        },
      });
    },
    {
      // eventTypes: ["keydown"],
      target: editableRef,
      when: !cmdKey,
    }
  );
  useKey(
    [91, 93],
    (evt) => {
      setCmdKey(evt.type == "keydown");
      console.log("cmd", evt.type);
    },
    {
      eventTypes: ["keydown", "keyup"],
      target: editableRef,
    }
  );
  const plugins = createPlugins(
    [
      createParagraphPlugin(),
      createImagePlugin(),
      createNodeIdPlugin(),
      createSoftBreakPlugin(CONFIG.softBreak),
      createTrailingBlockPlugin(CONFIG.trailingBlock),
      createExitBreakPlugin(CONFIG.exitBreak),
    ],
    {
      components,
    }
  );
  const handleChange = useCallback(
    async (val) => {
      console.log("tmps changed");
      const tmps = [];
      for await (const v of val) {
        if (v.type == "img") {
          // img
          const resp = await fetch(v.url);
          const value = await resp.blob();
          tmps.push({ type: "image", value });
        } else {
          // text
          const prev = tmps[tmps.length - 1];
          if (!prev) {
            tmps.push([{ type: "text", value: v.children[0].text }]);
          } else {
            if (Array.isArray(prev)) {
              tmps[tmps.length - 1].push({
                type: "text",
                value: v.children[0].text,
              });
            } else {
              tmps.push([{ type: "text", value: v.children[0].text }]);
            }
          }
        }
      }
      const arr = tmps.map((tmp) => {
        return Array.isArray(tmp)
          ? { type: "text", value: tmp.map((t) => t.value).join("\n") }
          : tmp;
      });
      const msgs = arr.filter(({ value }) => !!value);
      setMsgs(msgs);
      console.log("tmps", val, msgs);
    },
    [msgs]
  );
  // useEffect(() => {
  //   return () => {
  //     if (plateEditor) {
  //       // 清空
  //       Transforms.delete(plateEditor, {
  //         at: {
  //           anchor: Editor.start(plateEditor, []),
  //           focus: Editor.end(plateEditor, []),
  //         },
  //       });
  //     }
  //   };
  // }, [plateEditor]);

  return (
    <Styled className="input" ref={editableRef}>
      <Plate
        onChange={handleChange}
        id={`${TEXT_EDITOR_PREFIX}_${id}`}
        editableProps={{ ...initialProps, style: { userSelect: "text" } }}
        initialValue={initialValue}
        plugins={plugins}
      ></Plate>
    </Styled>
  );
};
export default Plugins;
// export default memo(Plugins, (prevs, nexts) => {
//   console.log("placeholder", prevs.placeholder, nexts.placeholder);
//   return prevs.placeholder == nexts.placeholder;
// });
