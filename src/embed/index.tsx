import { useState } from "react";
import styled from "styled-components";
const Styled = styled.aside`
  pointer-events: all;
`;
import Chat from "./Chat";
type Props = {};

function Embed({}: Props) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };
  return (
    <Styled>
      <button onClick={toggleVisible}>{visible ? "close" : "open"}</button>
      {visible && <Chat />}
    </Styled>
  );
}

export default Embed;
