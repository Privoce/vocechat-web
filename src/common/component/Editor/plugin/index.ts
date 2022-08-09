import { history } from "prosemirror-history";
import { Plugin } from "prosemirror-state";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import blockIndex from "./block-index/index";
import buildInputRules from "./input-rules";
import bindKeymap from "./keymap";
import schema from "../schema";
import cursor from "./cursor";
import autocomplete from "./autocomplete";
import placeholder from "./placeholder";
import { defaultOptions } from "./autocomplete/constants";

export interface PluginOptions {
  placeholder?: string;
}

const plugins: Plugin[] = [
  cursor(),
  placeholder("placeholder"),
  blockIndex(),
  buildInputRules(schema),
  ...autocomplete(defaultOptions),
  history(),
  keymap(bindKeymap(schema)),
  keymap(baseKeymap)
];

export default plugins;
