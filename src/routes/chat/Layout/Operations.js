import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useKey } from "rooks";
import useDeleteMessage from "../../../common/hook/useDeleteMessage";
import { updateSelectMessages } from "../../../app/slices/ui";
import { useFavoriteMessageMutation } from "../../../app/services/message";
import IconForward from "../../../assets/icons/forward.svg";
import IconBookmark from "../../../assets/icons/bookmark.svg";
import IconDelete from "../../../assets/icons/delete.svg";
import IconClose from "../../../assets/icons/close.circle.svg";
import ForwardModal from "../../../common/component/ForwardModal";
import toast from "react-hot-toast";
import DeleteMessageConfirmModal from "../../../common/component/DeleteMessageConfirm";
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
    &:disabled svg path {
      fill: #ccc;
    }
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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { canDelete } = useDeleteMessage();
  const [favoriteMsg] = useFavoriteMessageMutation();
  const mids = useSelector(
    (store) => store.ui.selectMessages[`${context}_${id}`]
  );
  const [forwardModalVisible, setForwardModalVisible] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(updateSelectMessages({ context, id, operation: "reset" }));
  };
  const handleFav = async () => {
    await favoriteMsg(mids);
    dispatch(updateSelectMessages({ context, id, operation: "reset" }));
    toast.success("Messages Saved!");
  };
  const toggleDeleteModal = (isSuccess = false) => {
    setDeleteModalVisible((prev) => !prev);
    if (isSuccess) {
      dispatch(updateSelectMessages({ context, id, operation: "reset" }));
      toast.success("Messages Deleted!");
    }
  };
  const toggleForwardModal = () => {
    setForwardModalVisible((prev) => !prev);
  };
  useKey("Escape", (evt) => {
    console.log("Escape keypress", evt);
    dispatch(updateSelectMessages({ context, id, operation: "reset" }));
  });
  const canDel = canDelete(mids);
  return (
    <>
      <Styled>
        <button className="opt" onClick={toggleForwardModal}>
          <IconForward />
        </button>
        <button className="opt" onClick={handleFav}>
          <IconBookmark />
        </button>
        <button
          className="opt"
          disabled={!canDel}
          onClick={toggleDeleteModal.bind(null, false)}
        >
          <IconDelete />
        </button>
        <IconClose className="close" onClick={handleClose} />
      </Styled>
      {forwardModalVisible && (
        <ForwardModal mids={mids} closeModal={toggleForwardModal} />
      )}
      {deleteModalVisible && (
        <DeleteMessageConfirmModal mids={mids} closeModal={toggleDeleteModal} />
      )}
    </>
  );
}
