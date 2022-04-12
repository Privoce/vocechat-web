import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StyledSettingContainer from "../../common/component/StyledSettingContainer";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useNavs from "./navs";
export default function ChannelSetting() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const navs = useNavs(cid);
  const flatenNavs = navs
    .map(({ items }) => {
      return items;
    })
    .flat();
  const [currNav, setCurrNav] = useState(flatenNavs[0]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const close = () => {
    navigate(-1);
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
  if (!cid) return null;
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
        <DeleteConfirmModal closeModal={toggleDeleteConfrim} id={cid} />
      )}
    </>
  );
}
