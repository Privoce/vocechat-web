import { Plugin } from 'prosemirror-state';

/**
 * top layer block index
 * bid: block id
 * hid: heading id (for outline feature)
 * @see https://discuss.prosemirror.net/t/how-i-can-attach-attribute-with-dynamic-value-when-new-paragraph-is-inserted/751/3
 */
const blockIndex = () => new Plugin({
  appendTransaction(transactions, oldState, newState) {
    const { tr } = newState;
    let modified = false;
    let hid = 0;
    newState.doc.forEach((node, offset, index) => {
      if (node.type.name === 'heading') {
        const { attrs } = node;
        tr.setNodeMarkup(offset, undefined, { ...attrs, bid: `${index}`, hid: `${hid}` });
        hid++;
        modified = true;
      }
    });

    newState.doc.descendants((node, pos) => {
      if (node.type.name === 'math_block') {
        const { attrs } = node;
        tr.setNodeMarkup(pos, undefined, { ...attrs, pos });
        modified = true;
      }
    });

    return modified ? tr : null;
  },
});

export default blockIndex;
