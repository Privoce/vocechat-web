import { NodeSpec } from 'prosemirror-model';

const paragraphNodeSpec: NodeSpec = {
  isTextblock: true,
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM: () => ['p', 0],
};

export default paragraphNodeSpec;
