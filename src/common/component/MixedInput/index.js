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
  // comboboxSelectors,
  // getMentionOnSelectItem,
  // findMentionInput,
  // removeMentionInput,
  // isSelectionInMentionInput,
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
import useUploadFile from "../../hook/useUploadFile";
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
  const enableMentions = members.length > 0;
  const { uploadFile } = useUploadFile();
  const filesRef = useRef([]);
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
  const pluginArr = [
    createParagraphPlugin(),
    createImagePlugin({
      options: {
        uploadImage: async (dataUrl) => {
          const resp = await fetch(dataUrl);
          const blob = await resp.blob();
          const { thumbnail, ...rest } = await uploadFile(blob);
          const { name, file_type, size, path, hash } = rest;
          filesRef.current.push({ name, file_type, size, path, hash });
          return thumbnail;
        },
      },
    }),
    createNodeIdPlugin(),
    createSoftBreakPlugin(CONFIG.softBreak),
    createTrailingBlockPlugin(CONFIG.trailingBlock),
    createExitBreakPlugin(CONFIG.exitBreak),
  ];
  const plugins = createPlugins(
    enableMentions
      ? pluginArr.concat([
          createComboboxPlugin(),
          createMentionPlugin({
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
        ])
      : pluginArr,
    {
      components,
    }
  );

  const handleChange = useCallback(
    async (val) => {
      console.log("tmps changed", val);
      // const wtf = getMentionOnSelectItem();
      // const plateEditor = getPlateEditorRef(`${TEXT_EDITOR_PREFIX}_${id}`);
      // const currentMentionInput = findMentionInput(plateEditor);
      // const items = comboboxSelectors.filteredItems();
      // console.log(
      //   "mention check",
      //   items,
      //   isSelectionInMentionInput(plateEditor)
      // );
      // if (items?.length == 0 && isSelectionInMentionInput(plateEditor)) {
      //   removeMentionInput(plateEditor, currentMentionInput[1]);
      // }
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
      for (const v of val) {
        if (v.type == "img") {
          // img
          const url = v.url;
          const file_path = decodeURIComponent(
            new URL(url).searchParams.get("file_path")
          );
          console.log("files", filesRef.current, file_path);
          const json = filesRef.current.find((f) => f.path == file_path) || {};
          const { name, size, hash, path, ...rest } = json;
          tmps.push({
            type: "file",
            content: { name, size, hash, path },
            properties: rest,
          });
        } else {
          // p
          const { value, mentions } = getMixedText(v.children);
          const prev = tmps[tmps.length - 1];
          if (!prev) {
            tmps.push([
              { type: "text", content: value, properties: { mentions } },
            ]);
          } else {
            if (Array.isArray(prev)) {
              tmps[tmps.length - 1].push({
                type: "text",
                content: value,
                properties: { mentions },
              });
            } else {
              tmps.push([
                { type: "text", content: value, properties: { mentions } },
              ]);
            }
          }
        }
      }
      const arr = tmps.map((tmp) => {
        return Array.isArray(tmp)
          ? {
              type: "text",
              content: tmp.map((t) => t.content).join("\n"),
              properties: {
                mentions: tmp.map((t) => t.properties?.mentions || []).flat(),
              },
            }
          : tmp;
      });
      const msgs = arr.filter(({ content }) => !!content);
      setMsgs(msgs);
      console.log("tmps", tmps, arr, msgs);
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
        {enableMentions ? (
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
        ) : null}
      </Plate>
    </Styled>
  );
};
export default Plugins;
// export default memo(Plugins, (prevs, nexts) => {
//   console.log("placeholder", prevs.placeholder, nexts.placeholder);
//   return prevs.placeholder == nexts.placeholder;
// });
