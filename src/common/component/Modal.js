import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ id = "root-modal", children }) {
  const [wrapper, setWrapper] = useState(null);
  // let eleRef = useRef(null);
  useEffect(() => {
    const modalRoot = document.getElementById(id);
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    modalRoot.appendChild(wrapper);
    setWrapper(wrapper);
    return () => {
      modalRoot.removeChild(wrapper);
    };
  }, [id]);
  if (!wrapper) return null;
  console.log("create portal");
  return createPortal(children, wrapper);
}
