import { useRef, useState, useCallback } from "react";
import { useKey } from "rooks";
import { useSelector } from "react-redux";
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
  createComboboxPlugin,
  createMentionPlugin,
  createPlugins,
  ELEMENT_PARAGRAPH,
  getPlateEditorRef,
  // usePlateEditorRef,
  ELEMENT_IMAGE,
  MentionCombobox,
  // usePlateStore
} from "@udecode/plate";
import { ReactEditor } from "slate-react";
import Styled from "./styled";
// import StyledCombobox from "./StyledCombobox";
import ImageElement from "./ImageElement";
import { CONFIG } from "./config";
import Contact from "../Contact";
// import Mention from "./Mention";
export const TEXT_EDITOR_PREFIX = "rustchat_text_editor";
export const setEditorFocus = (edtr) => {
  console.log("focus", edtr);
  ReactEditor.focus(edtr);
};
export const clearEditorAndFocus = (edtr) => {
  console.log("focus", edtr);

  Transforms.delete(edtr, {
    at: {
      anchor: Editor.start(edtr, []),
      focus: Editor.end(edtr, []),
    },
  });
};

let components = createPlateUI({
  [ELEMENT_IMAGE]: ImageElement,
  // customize your components by plugin key
});
const initialValue = [{ type: ELEMENT_PARAGRAPH, children: [{ text: "" }] }];
const Plugins = ({
  id = "",
  placeholder = "Write some markdown...",
  sendMessages,
  members = [],
}) => {
  // const plateEditor = usePlateEditorRef(`${TEXT_EDITOR_PREFIX}_${id}`);
  const contactData = useSelector((store) => store.contacts.byId);
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
      const plateEditor = getPlateEditorRef(`${TEXT_EDITOR_PREFIX}_${id}`);
      clearEditorAndFocus(plateEditor);
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
      createComboboxPlugin(),
      createMentionPlugin({
        // component: Mention,
        // handlers: {
        //   onKeyDown: ({ query }) => {
        //     console.log("mention", query);
        //     return true;
        //   },
        // },
        options: {
          createMentionNode: (item) => {
            console.log("mention", item);
            const {
              text,
              data: { uid },
            } = item;
            return { value: `@${text}`, uid };
          },
          insertSpaceAfterMention: true,
        },
      }),
    ],
    {
      components,
    }
  );

  const handleChange = useCallback(
    async (val) => {
      console.log("tmps changed", val);
      const tmps = [];
      const getMixedText = (children) => {
        const mentions = [];
        const arr = children.map(({ type, text, uid }) => {
          if (type == "mention") {
            mentions.push(uid);
            return ` @${uid} `;
          }
          return text;
        });
        return { value: arr.join(""), mentions };
      };
      for await (const v of val) {
        if (v.type == "img") {
          // img
          const resp = await fetch(v.url);
          const value = await resp.blob();
          tmps.push({ type: "image", value });
        } else {
          // p
          const { value, mentions } = getMixedText(v.children);
          const prev = tmps[tmps.length - 1];
          if (!prev) {
            tmps.push([{ type: "text", value, mentions }]);
          } else {
            if (Array.isArray(prev)) {
              tmps[tmps.length - 1].push({
                type: "text",
                value,
                mentions,
              });
            } else {
              tmps.push([{ type: "text", value, mentions }]);
            }
          }
        }
      }
      const arr = tmps.map((tmp) => {
        return Array.isArray(tmp)
          ? {
              type: "text",
              value: tmp.map((t) => t.value).join("\n"),
              mentions: tmp.map((t) => t.mentions).flat(),
            }
          : tmp;
      });
      const msgs = arr.filter(({ value }) => !!value);
      setMsgs(msgs);
      console.log("tmps", val, tmps, msgs);
    },
    [msgs]
  );

  return (
    <Styled className="input" ref={editableRef}>
      <Plate
        edi
        onChange={handleChange}
        id={`${TEXT_EDITOR_PREFIX}_${id}`}
        editableProps={{ ...initialProps, style: { userSelect: "text" } }}
        initialValue={initialValue}
        plugins={plugins}
      >
        <MentionCombobox
          // component={StyledCombobox}
          onRenderItem={({ item }) => {
            console.log("wtf", item);
            return <Contact uid={item.data.uid} interactive={false} />;
          }}
          items={members.map((id) => {
            const data = contactData[id];
            if (!data) return null;
            const { uid, name, ...rest } = data;
            return {
              key: uid,
              text: name,
              data: {
                uid,
                ...rest,
              },
            };
          })}
        />
      </Plate>
    </Styled>
  );
};
export default Plugins;
// export default memo(Plugins, (prevs, nexts) => {
//   console.log("placeholder", prevs.placeholder, nexts.placeholder);
//   return prevs.placeholder == nexts.placeholder;
// });
