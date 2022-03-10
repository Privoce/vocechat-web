// import React from "react";
import { VariableSizeList as List } from "react-window";
import Message from "../../common/component/Message";

export default function MessageList({ messages = [] }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <Message {...messages[index]} />
    </div>
  );
  const getItemSize = (index) =>
    messages[index].content_type.startsWith("image") ? 150 : 56;
  return (
    <List
      height={window.innerHeight - 56}
      width={"100%"}
      itemCount={messages.length}
      itemSize={getItemSize}
      //   estimatedItemSize={56}
    >
      {Row}
    </List>
  );
}
