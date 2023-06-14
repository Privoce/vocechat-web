import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export const pluginKey = new PluginKey("placeholder");

export default function placeholder(text: string) {
  return new Plugin({
    key: pluginKey,
    props: {
      decorations(state) {
        const { doc } = state;
        if (
          doc.childCount === 1 &&
          doc.firstChild?.isTextblock &&
          doc.firstChild.content.size === 0
        ) {
          const span = document.createElement("span");
          span.className = "opacity-50";
          span.innerText = text;
          return DecorationSet.create(doc, [Decoration.widget(1, span)]);
        }
        return null;
      }
    }
  });
}
export interface PluginOptions {
  placeholder?: string;
}
