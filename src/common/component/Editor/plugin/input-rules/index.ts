import {
  inputRules, textblockTypeInputRule, InputRule, wrappingInputRule
} from 'prosemirror-inputrules';
import { NodeType, Schema } from 'prosemirror-model';

function blockQuoteRule(nodeType: NodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
}

function orderedListRule(nodeType: NodeType) {
  return wrappingInputRule(
    /^(\d+)\.\s$/,
    nodeType,
    match => ({ order: +match[1] }),
    (match, node) => node.childCount + node.attrs.order === +match[1]
  );
}

function bulletListRule(nodeType: NodeType) {
  return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
}

function headingRule(nodeType: NodeType, maxLevel: number) {
  return textblockTypeInputRule(
    new RegExp(`^(#{1,${maxLevel}})\\s$`),
    nodeType,
    match => ({ level: match[1].length })
  );
}

export default function buildInputRules(schema: Schema) {
  // let rules = smartQuotes.concat(ellipsis, emDash), type;
  const rules: InputRule[] = [];
  rules.push(headingRule(schema.nodes.heading, 6));
  rules.push(blockQuoteRule(schema.nodes.blockquote));
  rules.push(orderedListRule(schema.nodes.ordered_list));
  rules.push(bulletListRule(schema.nodes.bullet_list));
  return inputRules({ rules });
}
