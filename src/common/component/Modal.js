import { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.getElementById('root-modal');
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
export default function Modal({ children }) {
    // let eleRef = useRef(null);
    useEffect(() => {
        // const wrapper = document.createElement('div');
        // eleRef.current = wrapper;
        modalRoot.appendChild(wrapper);
        return () => {
            modalRoot.removeChild(wrapper);
        };
    }, []);
    if (!wrapper) return null;
    console.log("create portal");
    return createPortal(children, wrapper);
}
