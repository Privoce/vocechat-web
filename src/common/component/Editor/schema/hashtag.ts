import { NodeSpec } from 'prosemirror-model';

const hashtagNodeSpec: NodeSpec = {
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
      class: 'hashtag-node',
      'data-hashtag-id': node.attrs.id,
      'data-hashtag-name': node.attrs.name,
    },
    `#${node.attrs.name}`,
  ],
  parseDOM: [
    {
      tag: 'span[data-hashtag-id][data-hashtag-name]',
      getAttrs: (dom) => {
        if (typeof dom === 'string') {
          return { id: '', name: '' };
        }
        return {
          id: dom.getAttribute('data-hashtag-id'),
          name: dom.getAttribute('data-hashtag-name'),
        };
      },
    },
  ],
};

export default hashtagNodeSpec;
