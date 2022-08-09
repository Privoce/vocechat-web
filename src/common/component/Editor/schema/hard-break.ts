import { NodeSpec } from 'prosemirror-model';

const hardBreakNodeSpec: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{ tag: 'br' }],
  toDOM: () => ['br'],
};

export default hardBreakNodeSpec;
