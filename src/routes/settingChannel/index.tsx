import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import LeaveChannel from "../../common/component/LeaveChannel";
import StyledSettingContainer from "../../common/component/StyledSettingContainer";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useNavs from "./navs";
import { useAppSelector } from "../../app/store";

let from: string | null = null;

export default function ChannelSetting() {
  const { cid } = useParams();
  const { loginUser, channel } = useAppSelector((store) => {
    return {
      loginUser: store.authData.user,
      channel: store.channels.byId[cid]
    };
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navs = useNavs(cid);
  const flatenNavs = navs
    .map(({ items }) => {
      return items;
    })
    .flat();
  const navKey = searchParams.get("nav");
  from = from ?? (searchParams.get("f") || "/");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [leaveConfirm, setLeaveConfirm] = useState(false);
  const close = () => {
    navigate(from);
    from = null;
  };
  const toggleDeleteConfrim = () => {
    setDeleteConfirm((prev) => !prev);
  };
  const toggleLeaveConfrim = () => {
    setLeaveConfirm((prev) => !prev);
  };
  if (!cid) return null;
  const currNav = flatenNavs.find((n) => n.name == navKey) || flatenNavs[0];
  const canDelete = loginUser.isAdmin || channel?.owner == loginUser.uid;
  const canLeave = !channel?.is_public;

  return (
    <>
      <StyledSettingContainer
        nav={currNav}
        closeModal={close}
        title="Channel Setting"
        navs={navs}
        dangers={[
          canLeave && {
            title: "Leave Channel",
            handler: toggleLeaveConfrim
          },
          canDelete && {
            title: "Delete Channel",
            handler: toggleDeleteConfrim
          }
        ]}
      >
        {currNav.component}
      </StyledSettingContainer>
      {deleteConfirm && <DeleteConfirmModal closeModal={toggleDeleteConfrim} id={cid} />}
      {leaveConfirm && <LeaveChannel closeModal={toggleLeaveConfrim} id={cid} />}
    </>
  );
}
