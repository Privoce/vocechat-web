import { useState, useRef } from "react";
// import { serialize } from "remark-slate";
import { useKey } from "rooks";

import { useUploadImageMutation } from "../../../app/services/message";
// import nodeTypes from "./values/nodeTypes";
import { PLUGINS } from "./plugins";
import {
  createPlateUI,
  //   HeadingToolbar,
  //   MentionCombobox,
  Plate,
  createExitBreakPlugin,
  //   createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  //   createDndPlugin,
  createTrailingBlockPlugin,
  //   createComboboxPlugin,
  //   createMentionPlugin,
  createPlugins,
  ELEMENT_PARAGRAPH,
  getPlateActions,
  platesActions,
  eventEditorStore,
  // usePlateStore
  // usePlateStore
} from "@udecode/plate";
import Styled from "./styled";
import { CONFIG } from "./config";
// import { VALUES } from "./values/values";

const id = "rustchat_rich_editor";

let components = createPlateUI({
  // customize your components by plugin key
});
// components = withStyledPlaceHolders(components);

const initialValue = [{ type: ELEMENT_PARAGRAPH, children: [{ text: "" }] }];
const Plugins = ({ placeholder = "Write some markdown...", sendMessage }) => {
  const editableRef = useRef(null);
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
  // const plugins = createPlugins(
  //   [
  //     createParagraphPlugin(),
  //     // createImagePlugin({
  //     //   options: {
  //     //     uploadImage: (imageData) => {
  //     //       return new Promise((resolve, reject) => {
  //     //         fetch(imageData)
  //     //           .then((res) => res.blob())
  //     //           .then((blob) => {
  //     //             uploadImage(blob).then(({ data }) => {
  //     //               console.log("upload image ", data);
  //     //               resolve(data);
  //     //             });
  //     //           });
  //     //       });
  //     //     },
  //     //   },
  //     // }),
  //     createNodeIdPlugin(),
  //     createResetNodePlugin(CONFIG.resetBlockType),
  //     // createSoftBreakPlugin(CONFIG.softBreak),
  //     createExitBreakPlugin(CONFIG.exitBreak),
  //     createTrailingBlockPlugin(CONFIG.trailingBlock),
  //     createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
  //   ],
  //   {
  //     components,
  //   }
  // );
  const handleChange = (val) => {
    console.log("changed", val);
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
        plugins={PLUGINS}
      ></Plate>
    </Styled>
  );
};
export default Plugins;
