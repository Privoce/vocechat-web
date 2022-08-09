import { NodeSpec } from 'prosemirror-model';

const blockquoteNodeSpec: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM: () => ['blockquote', 0],
};

export default blockquoteNodeSpec;
