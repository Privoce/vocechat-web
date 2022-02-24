import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleChannelSetting } from "../../../app/slices/ui";
import StyledSettingContainer from "../StyledSettingContainer";
import DeleteConfirmModal from "./DeleteConfirmModal";
import navs from "./navs";
export default function ChannelSetting({ id = 0 }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(toggleChannelSetting());
  };
  const toggleDeleteConfrim = () => {
    setDeleteConfirm((prev) => !prev);
  };
  if (!id) return null;
  return (
    <>
      <StyledSettingContainer
        closeModal={close}
        title="Channel Setting"
        navs={navs}
        dangers={[
          {
            title: "Delete Channel",
            handler: toggleDeleteConfrim,
          },
        ]}
      >
        right block
      </StyledSettingContainer>
      {deleteConfirm && (
        <DeleteConfirmModal closeModal={toggleDeleteConfrim} id={id} />
      )}
    </>
  );
}
