import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useKey } from "rooks";
import { updateSelectMessages } from "../../../app/slices/ui";
import IconForward from "../../../assets/icons/forward.svg";
import IconBookmark from "../../../assets/icons/bookmark.svg";
import IconDelete from "../../../assets/icons/delete.svg";
import IconClose from "../../../assets/icons/close.circle.svg";
import ForwardModal from "../../../common/component/ForwardModal";
const Styled = styled.div`
  position: relative;
  padding: 16px;
  /* padding-bottom: 0; */
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.05);
  .opt {
    padding: 8px;
    background: #f2f4f7;
    border-radius: var(--br);
  }
  .close {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
export default function Operations({ context, id }) {
  const mids = useSelector(
    (store) => store.ui.selectMessages[`${context}_${id}`]
  );
  const [forwardModalVisible, setForwardModalVisible] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(updateSelectMessages({ context, id, operation: "reset" }));
  };
  const toggleForwardModal = () => {
    setForwardModalVisible((prev) => !prev);
  };
  useKey("Escape", (evt) => {
    console.log("Escape keypress", evt);
    dispatch(updateSelectMessages({ context, id, operation: "reset" }));
  });
  return (
    <>
      <Styled>
        <button className="opt" onClick={toggleForwardModal}>
          <IconForward />
        </button>
        <button className="opt">
          <IconBookmark />
        </button>
        <button className="opt">
          <IconDelete />
        </button>
        <IconClose className="close" onClick={handleClose} />
      </Styled>
      {forwardModalVisible && (
        <ForwardModal mids={mids} closeModal={toggleForwardModal} />
      )}
    </>
  );
}
