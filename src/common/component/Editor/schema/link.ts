import { MarkSpec } from 'prosemirror-model';

const linkMarkSpec: MarkSpec = {
  attrs: {
    href: { default: '' },
    title: { default: null },
    target: { default: '_blank' },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs: (element) => {
        if (typeof element === 'string') {
          return { href: '', title: null, target: '_blank' };
        }
        return {
          href: element.getAttribute('href'),
          title: element.getAttribute('title'),
          target: element.getAttribute('target') ?? '_blank',
        };
      },
    },
  ],
  toDOM(node) {
    return ['a', node.attrs, 0];
  },
};

export default linkMarkSpec;
