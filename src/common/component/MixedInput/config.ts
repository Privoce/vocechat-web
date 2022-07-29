import { ELEMENT_IMAGE, ELEMENT_PARAGRAPH } from "@udecode/plate";

export const CONFIG = {
  editableProps: {
    spellCheck: false,
    autoFocus: true,
    placeholder: "Type…"
  },
  trailingBlock: { type: ELEMENT_PARAGRAPH },
  softBreak: {
    options: {
      rules: [
        {
          hotkey: "shift+enter",
          query: {
            allow: [ELEMENT_IMAGE, ELEMENT_PARAGRAPH]
          }
        }
      ]
    }
  },
  exitBreak: {
    options: {
      rules: [
        {
          hotkey: "mod+enter",
          query: {
            allow: [ELEMENT_IMAGE, ELEMENT_PARAGRAPH]
          }
        }
      ]
    }
  },
  selectOnBackspace: {
    options: {
      query: {
        allow: [ELEMENT_IMAGE]
      }
    }
  }
};
