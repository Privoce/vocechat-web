import { Schema } from "prosemirror-model";
import { Command } from "prosemirror-state";
import { undo, redo } from "prosemirror-history";
import { toggleMark, joinUp, joinDown, chainCommands, exitCode } from "prosemirror-commands";
import { liftListItem, sinkListItem, splitListItem } from "prosemirror-schema-list";
import UAParser from "ua-parser-js";

const uaParser = new UAParser();
const isMac = /Mac|iP(hone|[oa]d)/.test(uaParser.getOS().name ?? "");

function bindKeymap(schema: Schema, mapKeys?: { [key: string]: false | string }) {
  const keys: { [key: string]: Command } = {};

  function bind(key: string, cmd: Command) {
    if (mapKeys) {
      let mapped = mapKeys[key];
      if (mapped === false) return;
      if (mapped) key = mapped;
    }
    keys[key] = cmd;
  }

  bind("Mod-z", undo);
  bind("Shift-Mod-z", redo);
  if (!isMac) {
    bind("Mod-y", redo);
  }

  bind("Alt-ArrowUp", joinUp);
  bind("Alt-ArrowDown", joinDown);

  if (schema.marks.strong) {
    const type = schema.marks.strong;
    bind("Mod-b", toggleMark(type));
    bind("Mod-B", toggleMark(type));
  }
  if (schema.marks.em) {
    const type = schema.marks.em;
    bind("Mod-i", toggleMark(type));
    bind("Mod-I", toggleMark(type));
  }
  if (schema.marks.code) {
    const type = schema.marks.code;
    bind("Mod-`", toggleMark(type));
  }

  if (schema.nodes.list_item) {
    const type = schema.nodes.list_item;
    bind("Enter", splitListItem(type));
    bind("Shift-Tab", liftListItem(type));
    bind("Tab", sinkListItem(type));
    bind("Mod-[", liftListItem(type));
    bind("Mod-]", sinkListItem(type));
  }

  if (schema.nodes.hard_break) {
    const type = schema.nodes.hard_break;
    const command = chainCommands(exitCode, (state, dispatch) => {
      if (dispatch) {
        dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
      }
      return true;
    });
    bind("Mod-Enter", command);
    bind("Shift-Enter", command);
    if (isMac) bind("Ctrl-Enter", command);
  }
  return keys;
}

export default bindKeymap;
