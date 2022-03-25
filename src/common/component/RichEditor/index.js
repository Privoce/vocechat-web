import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { serialize } from "remark-slate";
import { useKey } from "rooks";

import { useUploadImageMutation } from "../../../app/services/message";
import nodeTypes from "./values/nodeTypes";
import {
  createPlateUI,
  //   HeadingToolbar,
  //   MentionCombobox,
  Plate,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  //   createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  //   createDndPlugin,
  createStrikethroughPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  //   createComboboxPlugin,
  //   createMentionPlugin,
  createIndentPlugin,
  createDeserializeMdPlugin,
  createHorizontalRulePlugin,
  createPlugins,
  ELEMENT_PARAGRAPH,
  getPlateActions,
  platesActions,
  eventEditorStore,
  // usePlateStore
  // usePlateStore
} from "@udecode/plate";
// import MarkBallonToolbar from "./components/MarkBallonToolbar";
import Styled from "./styled";
// import { withStyledPlaceHolders } from "./components/withStyledPlaceHolders";
// import { MENTIONABLES } from "./mentionables";
import { CONFIG } from "./config";
// import { VALUES } from "./values/values";

const id = "rustchat_richEditor";

let components = createPlateUI({
  // customize your components by plugin key
});
// components = withStyledPlaceHolders(components);

const initialValue = [{ type: ELEMENT_PARAGRAPH, children: [{ text: "" }] }];
const Plugins = ({
  placeholder = "Write some markdown...",
  updateMarkdown,
  updatePureText,
  sendMessage,
}) => {
  const editableRef = useRef(null);
  // const editor = useEditorRef();
  // const { } =usePlateStore()
  const [uploadImage] = useUploadImageMutation();
  useKey(
    "Enter",
    (evt) => {
      console.log("enter keypress", evt);
      if (evt.shiftKey || evt.ctrlKey || evt.altKey || evt.isComposing) {
        return true;
      }
      evt.preventDefault();
      sendMessage();
      platesActions.unset(id);
      platesActions.set(id, {
        initialValue,
      });
      // eventEditorStore.set()
      getPlateActions(id).enabled(false);
      getPlateActions(id).enabled(true);
      // eventEditorStore.get();
      // getPlateActions(id).set;
      // editor.reset
    },
    {
      // eventTypes: ["keydown"],
      target: editableRef,
      // when: !shift,
    }
  );
  const plugins = createPlugins(
    [
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin({
        options: {
          uploadImage: (imageData) => {
            return new Promise((resolve, reject) => {
              fetch(imageData)
                .then((res) => res.blob())
                .then((blob) => {
                  uploadImage(blob).then(({ data }) => {
                    console.log("upload image ", data);
                    resolve(data);
                  });
                });
            });
          },
        },
      }),
      createHorizontalRulePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      //   createMediaEmbedPlugin(),
      createCodeBlockPlugin(),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      //   createDndPlugin(),
      createIndentPlugin(CONFIG.indent),
      createAutoformatPlugin(CONFIG.autoformat),
      createResetNodePlugin(CONFIG.resetBlockType),
      // createSoftBreakPlugin(CONFIG.softBreak),
      createExitBreakPlugin(CONFIG.exitBreak),
      createTrailingBlockPlugin(CONFIG.trailingBlock),
      createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
      //   createComboboxPlugin(),
      //   createMentionPlugin(),
      createDeserializeMdPlugin(),
    ],
    {
      components,
    }
  );
  const handleChange = (val) => {
    const nonEmptyElements = val;
    // .filter((v) => {
    //   const obj = v.children[0];
    //   return obj.type == "p" && !!v.children[0].text;
    // });
    const md = nonEmptyElements
      .map((v) =>
        serialize(v, {
          nodeTypes,
          listDepth: 3,
        })
      )
      .join("\n");
    console.log("md changed", val, nonEmptyElements, md);
    updateMarkdown(md);
    const nonParagraphs = nonEmptyElements.filter((v) => {
      return v.type != "p" || v.children.length > 1;
    });
    if (nonParagraphs.length == 0) {
      const nonEmptyPs = nonEmptyElements.filter((v) => !!v.children[0].text);
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
  };
  return (
    <Styled className="input" ref={editableRef}>
      <Plate
        onChange={handleChange}
        id={id}
        editableProps={{
          ...CONFIG.editableProps,
          placeholder,
        }}
        initialValue={initialValue}
        plugins={plugins}
      >
        {/* <MarkBallonToolbar /> */}

        {/* <MentionCombobox items={MENTIONABLES} /> */}
      </Plate>
    </Styled>
  );
};
export default Plugins;
