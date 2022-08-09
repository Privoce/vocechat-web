import { Schema } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import paragraphNodeSpec from './paragraph';
import blockquoteNodeSpec from './blockquote';
import horizontalRuleNodeSpec from './horizontal-rule';
import headingNodeSpec from './heading';
import codeBlockNodeSpec from './code-block';
import mentionNodeSpec from './mention';
import hashtagNodeSpec from './hashtag';
import linkMarkSpec from './link';
import hardBreakNodeSpec from './hard-break';

const baseSchema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    // Enter 时排在最前默认优先插入该类型节点
    paragraph: paragraphNodeSpec,
    blockquote: blockquoteNodeSpec,
    horizontal_rule: horizontalRuleNodeSpec,
    heading: headingNodeSpec,
    code_block: codeBlockNodeSpec,
    mention: mentionNodeSpec,
    hashtag: hashtagNodeSpec,
    hard_break: hardBreakNodeSpec,
    text: { inline: true, group: 'inline' },
  },
  marks: {
    strong: {
      parseDOM: [{ tag: 'strong' }, { style: 'font-weight=bold' }],
      toDOM: () => ['strong', 0],
    },
    em: {
      parseDOM: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style=italic' }],
      toDOM: () => ['em', 0],
    },
    s: {
      parseDOM: [{ tag: 's' }, { style: 'text-decoration=line-through' }],
      toDOM: () => ['s', 0],
    },
    u: { parseDOM: [{ tag: 'u' }], toDOM: () => ['u', 0] },
    code: { parseDOM: [{ tag: 'code' },], toDOM: () => ['code', 0] },
    link: linkMarkSpec,
  },
});

const schema = new Schema({
  nodes: addListNodes(baseSchema.spec.nodes, 'block+', 'block'),
  marks: baseSchema.spec.marks,
});

export default schema;
