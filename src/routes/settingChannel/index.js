import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import StyledSettingContainer from "../../common/component/StyledSettingContainer";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useNavs from "./navs";
let from = null;
export default function ChannelSetting() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cid } = useParams();
  const navs = useNavs(cid);
  const flatenNavs = navs
    .map(({ items }) => {
      return items;
    })
    .flat();
  const navKey = searchParams.get("nav");
  from = from ?? (searchParams.get("f") || "/");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const close = () => {
    navigate(from);
    from = null;
  };
  const toggleDeleteConfrim = () => {
    setDeleteConfirm((prev) => !prev);
  };
  if (!cid) return null;
  const currNav = flatenNavs.find((n) => n.name == navKey) || flatenNavs[0];
  return (
    <>
      <StyledSettingContainer
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
