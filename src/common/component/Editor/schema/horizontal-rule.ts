import { NodeSpec } from 'prosemirror-model';

const horizontalRuleNodeSpec: NodeSpec = {
  attrs: { markup: { default: '---' } },
  group: 'block',
  selectable: true,
  draggable: true,
  parseDOM: [{ tag: 'hr' }],
  toDOM: () => ['div', ['hr']],
};

export default horizontalRuleNodeSpec;
