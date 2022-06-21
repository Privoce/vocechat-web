import {
  ELEMENT_PARAGRAPH
  // TElement,
} from "@udecode/plate";
//   import { Text } from 'slate'

export const createElement = (text = "", { type = ELEMENT_PARAGRAPH, mark } = {}) => {
  const leaf = { text };
  if (mark) {
    leaf[mark] = true;
  }

  return {
    type,
    children: [leaf]
  };
};

export const getNodesWithRandomId = (nodes = []) => {
  let _id = 10000;
  nodes.forEach((node) => {
    node.id = _id;
    _id++;
  });

  return nodes;
};
