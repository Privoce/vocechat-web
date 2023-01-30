import { FC, useState } from "react";
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

type Props = {
  context: "user" | "channel";
  id: number;
};
const Operations: FC<Props> = ({ context, id }) => {
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

  useKey("Escape", () => {
    dispatch(updateSelectMessages({ context, id, operation: "reset" }));
  });
  const canDel = canDelete(mids);

  // const 
  return (
    <>
      <div className="relative p-4 flex-center gap-8 shadow-md">
        <button className="p-2 bg-slate-100 rounded hover:bg-slate-300" onClick={toggleForwardModal}>
          <IconForward />
        </button>
        <button className="p-2 bg-slate-100 rounded hover:bg-slate-300" onClick={handleFav}>
          <IconBookmark />
        </button>
        <button className="p-2 bg-slate-100 rounded hover:bg-slate-300" disabled={!canDel} onClick={toggleDeleteModal.bind(null, false)}>
          <IconDelete />
        </button>
        <IconClose className="cursor-pointer absolute right-5 top-1/2 -translate-y-1/2" onClick={handleClose} />
      </div>
      {forwardModalVisible && <ForwardModal mids={mids} closeModal={toggleForwardModal} />}
      {deleteModalVisible && (
        <DeleteMessageConfirmModal mids={mids} closeModal={toggleDeleteModal} />
      )}
    </>
  );
};
export default Operations;
