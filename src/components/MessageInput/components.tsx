import React from "react";
import ReactDOM from "react-dom";
import { Node } from "slate";
import { useFocused, useSelected } from "slate-react";

export const Portal = ({ children }) => {
  return typeof document === "object" ? ReactDOM.createPortal(children, document.body) : null;
};

// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
export const Mention = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  const style: React.CSSProperties = {
    padding: "3px 3px 2px",
    margin: "0 1px",
    verticalAlign: "baseline",
    display: "inline-block",
    borderRadius: "4px",
    backgroundColor: "#eee",
    fontSize: "0.9em",
    boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none"
  };
  // See if our empty text child has any styling marks applied and apply those
  if (element.children[0].bold) {
    style.fontWeight = "bold";
  }
  if (element.children[0].italic) {
    style.fontStyle = "italic";
  }
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(" ", "-")}`}
      style={style}
    >
      @{element.character}
      {children}
    </span>
  );
};
export const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "mention":
      return <Mention {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
export const CHARACTERS = [
  "杨国春",
  "Adi Gallia",
  "Admiral Dodd Rancit",
  "Admiral Firmus Piett",
  "Admiral Gial Ackbar"
];
type ChildNode =
  | {
      text: string;
    }
  | {
      type: "mention";
      value: string;
    };
export const getFormatedContent = (values: ChildNode[]) => {
  let res = [];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if ("text" in value) {
      if (value.text.trim() === "") continue;
      res.push({
        type: "paragraph",
        children: [{ text: value }]
      });
    } else {
      res.push({
        type: "mention",
        character: value.value,
        children: [{ text: "" }]
      });
    }
  }
  return res;
};
export const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n).trim()).join("\n");
};
