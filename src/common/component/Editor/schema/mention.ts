import { NodeSpec } from 'prosemirror-model';

const mentionNodeSpec: NodeSpec = {
  group: 'inline',
  inline: true,
  selectable: false,
  draggable: false,
  atom: true,
  attrs: {
    id: { default: '' },
    name: { default: '' },
  },
  toDOM: (node) => [
    'span',
    {
      class: 'mention-node',
      'data-mention-id': node.attrs.id,
      'data-mention-name': node.attrs.name,
    },
    `@${node.attrs.name}`,
  ],
  parseDOM: [
    {
      tag: 'span[data-mention-id][data-mention-name]',
      getAttrs: (dom) => {
        if (typeof dom === 'string') {
          return { id: '', name: '' };
        }
        return {
          id: dom.getAttribute('data-mention-id'),
          name: dom.getAttribute('data-mention-name')
        };
      },
    },
  ],
};

export default mentionNodeSpec;
