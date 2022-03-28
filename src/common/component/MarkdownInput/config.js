import {
  //   AutoformatPlugin,
  CodeBlockElement,
  createPlateUI,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ELEMENT_TODO_LI,
  // ExitBreakPlugin,
  // IndentPlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  // NormalizeTypesPlugin,
  // PlatePlugin,
  // ResetNodePlugin,
  // SelectOnBackspacePlugin,
  // SoftBreakPlugin,
  // TrailingBlockPlugin,
  withProps,
} from "@udecode/plate";
//   import { EditableProps } from 'slate-react/dist/components/editable'
import { css } from "styled-components";

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

export const CONFIG = {
  editableProps: {
    spellCheck: false,
    autoFocus: true,
    placeholder: "Type…",
  },
  components: createPlateUI({
    [ELEMENT_CODE_BLOCK]: withProps(CodeBlockElement, {
      styles: {
        root: [
          css`
            background-color: #111827;
            code {
              color: white;
            }
          `,
        ],
      },
    }),
  }),

  resetBlockType: {
    options: {
      rules: [
        {
          ...resetBlockTypesCommonRule,
          hotkey: "Enter",
          predicate: isBlockAboveEmpty,
        },
        {
          ...resetBlockTypesCommonRule,
          hotkey: "Backspace",
          predicate: isSelectionAtBlockStart,
        },
      ],
    },
  },
  trailingBlock: { type: ELEMENT_PARAGRAPH },
  softBreak: {
    options: {
      rules: [
        // { hotkey: "shift+enter" },
        // {
        //   hotkey: "enter",
        //   query: {
        //     allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
        //   },
        // },
      ],
    },
  },
  exitBreak: {
    options: {
      rules: [
        {
          hotkey: "mod+enter",
        },
        // {
        //   hotkey: "mod+shift+enter",
        //   before: true,
        // },
        // {
        //   hotkey: "enter",
        //   query: {
        //     start: true,
        //     end: true,
        //     allow: KEYS_HEADING,
        //   },
        // },
      ],
    },
  },
  selectOnBackspace: {
    options: {
      query: {
        allow: [ELEMENT_IMAGE, ELEMENT_HR],
      },
    },
  },
};
