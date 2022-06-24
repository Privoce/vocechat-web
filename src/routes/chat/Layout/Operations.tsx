import { useState } from "react";
import styled from "styled-components";
import { useKey } from "rooks";
import toast from "react-hot-toast";
import useDeleteMessage from "../../../common/hook/useDeleteMessage";
import useFavMessage from "../../../common/hook/useFavMessage";
import { updateSelectMessages } from "../../../app/slices/ui";
import IconForward from "../../../assets/icons/forward.svg";
import IconBookmark from "../../../assets/icons/bookmark.svg";
import IconDelete from "../../../assets/icons/delete.svg";
import IconClose from "../../../assets/icons/close.circle.svg";
import ForwardModal from "../../../common/component/ForwardModal";
import DeleteMessageConfirmModal from "../../../common/component/DeleteMessageConfirm";
import { useAppDispatch, useAppSelector } from "../../../app/store";

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
    &:hover {
      background: #eaecf0;
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
  const { addFavorite } = useFavMessage({});
  const mids = useAppSelector((store) => store.ui.selectMessages[`${context}_${id}`]);
  const [forwardModalVisible, setForwardModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(updateSelectMessages({ context, id, operation: "reset" }));
  };

  const handleFav = async () => {
    const added = await addFavorite(mids);
    if (added) {
      console.log("added", added);
      dispatch(updateSelectMessages({ context, id, operation: "reset" }));
      toast.success("Messages Saved!");
    } else {
      toast.error("Operation Failed!");
    }
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
        <button className="opt" disabled={!canDel} onClick={toggleDeleteModal.bind(null, false)}>
          <IconDelete />
        </button>
        <IconClose className="close" onClick={handleClose} />
      </Styled>
      {forwardModalVisible && <ForwardModal mids={mids} closeModal={toggleForwardModal} />}
      {deleteModalVisible && (
        <DeleteMessageConfirmModal mids={mids} closeModal={toggleDeleteModal} />
      )}
    </>
  );
}
