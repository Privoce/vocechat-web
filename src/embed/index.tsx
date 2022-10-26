import { useState } from "react";
import Chat from "./Chat";
type Props = {};

function Embed({ }: Props) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };
  return (
    <div className="bg-slate-400 w-12 h-12">
      <button onClick={toggleVisible}>{visible ? "close" : "open"}</button>
      {visible && <Chat />}
    </div>
  );
}

export default Embed;
