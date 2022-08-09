import { NodeSpec } from 'prosemirror-model';

const codeBlockNodeSpec: NodeSpec = {
  attrs: { info: { default: '' } },
  group: 'block',
  marks: '',
  content: 'text*',
  code: true,
  defining: true,
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full',
      getAttrs(node) {
        if (typeof node === 'string') return { info: '' };
        const el = node as HTMLElement;
        let info: string | null;
        info = el.getAttribute('info');
        if (info) return { info };
        info = el.getAttribute('lang');
        if (info) return { info };
        return { info: '' };
      },
    },
  ],
  toDOM: node => ['pre', { info: node.attrs.info }, ['code', 0]],
};

export default codeBlockNodeSpec;
