import { useRef, useEffect, ClipboardEvent, FC } from "react";
import { useKey } from "rooks";
import { Editor, Transforms } from "slate";
import {
  createPlateUI,
  Plate,
  createExitBreakPlugin,
  createTrailingBlockPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createSoftBreakPlugin,
  createMentionPlugin,
  findMentionInput,
  createPlugins,
  ELEMENT_PARAGRAPH,
  getPlateEditorRef,
  MentionCombobox
} from "@udecode/plate";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { ReactEditor } from "slate-react";
import useUploadFile from "../../hook/useUploadFile";
import { CONFIG } from "./config";
import User from "../User";
import { useAppSelector } from "../../../app/store";
import { isMobile } from "../../utils";
export const TEXT_EDITOR_PREFIX = "_text_editor";

let components = createPlateUI({
  // [ELEMENT_IMAGE]: ImageElement,
  // customize your components by plugin key
});
const initials = [{ type: ELEMENT_PARAGRAPH, children: [{ text: "" }] }];
type ctx = "channel" | "user";
type Props = {
  updateDraft: (draft: any) => void | null;
  initialValue?: any;
  id: `${ctx}_${number}`;
  placeholder: string;
  sendMessages: any;
  updateMessages: any;
  members: number[];
};
const Plugins: FC<Props> = ({
  updateDraft = null,
  initialValue = initials,
  id,
  placeholder = "Write some markdown...",
  sendMessages,
  updateMessages,
  members = []
}) => {

  // const { getMenuProps, getItemProps } = useComboboxControls();
  const [context, to] = id.split("_") as [ctx, number];
  const { addStageFile } = useUploadFile({ context, id: to });
  const enableMentions = members.length > 0;
  const userData = useAppSelector((store) => store.users.byId);
  const editableRef = useRef(null);
  const initialProps = {
    ...CONFIG.editableProps,
    className: "flex flex-col md:gap-2",
    placeholder
  };
  const plateEditor = getPlateEditorRef(`${TEXT_EDITOR_PREFIX}_${id}`);
  useEffect(() => {
    const handlePasteEvent = (evt: ClipboardEvent<Window>) => {
      const files = [...evt.clipboardData.files];
      if (files.length) {
        const filesData = files.map((file) => {
          const { size, type, name } = file;
          // console.log("paste event name", name);
          const url = URL.createObjectURL(file);
          return { size, type, name, url };
        });
        addStageFile(filesData);
      }
    };
    window.addEventListener("paste", handlePasteEvent);
    return () => {
      window.removeEventListener("paste", handlePasteEvent);
      // if (plateEditor && updateDraft) {
      //   updateDraft(plateEditor.children);
      // }
    };
  }, [id, updateDraft]);

  useKey(
    "Enter",
    (evt) => {
      if (!plateEditor) return;
      // 是否在at操作
      const mentionInputs = findMentionInput(plateEditor);
      if (mentionInputs || evt.shiftKey || evt.ctrlKey || evt.altKey || evt.isComposing) {
        return true;
      }
      evt.preventDefault();
      // return true;
      sendMessages();
    },
    {
      when: !isMobile(),
      target: editableRef,
    }
  );
  const pluginArr = [
    createParagraphPlugin(),
    createNodeIdPlugin(),
    createSoftBreakPlugin(CONFIG.softBreak),
    createTrailingBlockPlugin(CONFIG.trailingBlock),
    createExitBreakPlugin(CONFIG.exitBreak)
  ];
  const plugins = createPlugins(
    enableMentions
      ? pluginArr.concat([
        createComboboxPlugin(),
        createMentionPlugin({
          options: {
            createMentionNode: (item) => {
              // console.log("mention", item);
              const {
                text,
                data: { uid }
              } = item;
              return { value: `@${text}`, uid };
            },
            insertSpaceAfterMention: true
          }
        })
      ])
      : pluginArr,
    {
      components
    }
  );

  const handleChange = (val: any) => {
    // console.log("tmps changed", val);
    const tmps = [];
    const getMixedText = (children: any) => {
      const mentions: any = [];
      const arr = children.map(({ type, text, uid }: any) => {
        if (type == "mention") {
          mentions.push(uid);
          return ` @${uid} `;
        }
        return text;
      });
      return { value: arr.join(""), mentions };
    };
    for (const v of val) {
      // p
      const { value, mentions } = getMixedText(v.children);
      const prev = tmps[tmps.length - 1];
      if (!prev) {
        tmps.push([{ type: "text", content: value, properties: { mentions } }]);
      } else {
        if (Array.isArray(prev)) {
          tmps[tmps.length - 1].push({
            type: "text",
            content: value,
            properties: { mentions }
          });
        } else {
          tmps.push([{ type: "text", content: value, properties: { mentions } }]);
        }
      }
    }
    const arr = tmps.map((tmp) => {
      return Array.isArray(tmp)
        ? {
          type: "text",
          content: tmp.map((t) => t.content).join("\n"),
          properties: {
            mentions: tmp.map((t) => t.properties?.mentions || []).flat()
          }
        }
        : tmp;
    });
    const msgs = arr.filter(({ content }) => !!content.trim());
    updateMessages(msgs);
  };


  return (
    <div className="input w-full pr-14 md:pr-0 max-h-[50vh] overflow-auto text-sm text-gray-600 dark:text-white" ref={editableRef}>
      <Plate
        id={`${TEXT_EDITOR_PREFIX}_${id}`}
        onChange={handleChange}
        editableProps={{ ...initialProps, style: { userSelect: "text" } }}
        initialValue={initialValue}
        plugins={plugins}
      >
        {enableMentions ? (
          <MentionCombobox
            onRenderItem={({ item }) => {
              if (!item || !item.data) return null;
              return <User key={item.data.uid} uid={item.data.uid} interactive={false} />;
            }}
            items={members.map((id) => {
              const data = userData[id];
              if (!data) {
                // console.log("wtffe", id, userData);
                return { key: id };
              }
              const { uid, name, ...rest } = data;
              return {
                key: uid,
                text: name,
                data: {
                  uid,
                  ...rest
                }
              };
            })}
          />
        ) : null}
      </Plate>
    </div>
  );
};

export const useMixedEditor = (key: string) => {
  const editorRef = getPlateEditorRef(`${TEXT_EDITOR_PREFIX}_${key}`);
  const focus = () => {
    if (editorRef) {
      ReactEditor.focus(editorRef);
    }
  };
  const insertText = (txt: string) => {
    // console.log("eref", editorRef);
    if (editorRef) {
      ReactEditor.focus(editorRef);
      editorRef.insertText(txt);
    }
  };
  const resetInput = () => {
    if (!editorRef) return;
    // 清空
    Transforms.delete(editorRef, {
      at: {
        anchor: Editor.start(editorRef, []),
        focus: Editor.end(editorRef, [])
      }
    });
  };
  return {
    resetInput,
    focus,
    insertText
  };
};
export default Plugins;
