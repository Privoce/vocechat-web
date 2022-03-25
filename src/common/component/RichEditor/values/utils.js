import {
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  // TElement,
} from "@udecode/plate";
//   import { Text } from 'slate'

export const createElement = (
  text = "",
  { type = ELEMENT_PARAGRAPH, mark } = {}
) => {
  const leaf = { text };
  if (mark) {
    leaf[mark] = true;
  }

  return {
    type,
    children: [leaf],
  };
};

export const createList = (items = [], { splitSeparator = "`" } = {}) => {
  const children = items.map((item) => {
    const texts = item.split(splitSeparator);
    const marks = texts.map((text, index) => {
      const res = { text };
      if (index % 2 === 1) {
        res.code = true;
      }
      return res;
    });

    return {
      type: ELEMENT_LI,
      children: [
        {
          type: ELEMENT_LIC,
          children: marks,
        },
      ],
    };
  });

  return [
    {
      type: ELEMENT_UL,
      children,
    },
  ];
};

export const getNodesWithRandomId = (nodes = []) => {
  let _id = 10000;
  nodes.forEach((node) => {
    node.id = _id;
    _id++;
  });

  return nodes;
};
