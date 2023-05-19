import {
  createBasicElementsPlugin,
  createImagePlugin,
  createParagraphPlugin,
  createSelectOnBackspacePlugin
} from "@udecode/plate";

import { CONFIG } from "./config";

const basicElements = [
  createParagraphPlugin() // paragraph element
];

export const PLUGINS = {
  basicElements,
  basicNodes: [...basicElements],
  image: [
    createBasicElementsPlugin(),
    createImagePlugin(),
    createSelectOnBackspacePlugin(CONFIG.selectOnBackspace)
  ]
};
