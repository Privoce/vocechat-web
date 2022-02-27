import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleChannelSetting } from "../../../app/slices/ui";
import StyledSettingContainer from "../StyledSettingContainer";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useNavs from "./navs";
export default function ChannelSetting({ id = 0 }) {
  const navs = useNavs(id);
  const flatenNavs = navs
    .map(({ items }) => {
      return items;
    })
    .flat();
  const [currNav, setCurrNav] = useState(flatenNavs[0]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(toggleChannelSetting());
  };
  const toggleDeleteConfrim = () => {
    setDeleteConfirm((prev) => !prev);
  };
  const updateNav = (name) => {
    const tmp = flatenNavs.find((n) => n.name == name);
    if (tmp) {
      setCurrNav(tmp);
    }
  };
  if (!id) return null;
  return (
    <>
      <StyledSettingContainer
        updateNav={updateNav}
        nav={currNav}
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
        {currNav.component}
      </StyledSettingContainer>
      {deleteConfirm && (
        <DeleteConfirmModal closeModal={toggleDeleteConfrim} id={id} />
      )}
    </>
  );
}
