import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import LeaveChannel from "../../common/component/LeaveChannel";
import StyledSettingContainer, { Danger } from "../../common/component/StyledSettingContainer";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useNavs from "./navs";
import { useAppSelector } from "../../app/store";

let from: string | null = null;

export default function ChannelSetting() {
  const { cid } = useParams<{ cid: string }>();
  const cidNum = Number(cid);
  const { isAdmin, loginUid, channel } = useAppSelector((store) => {
    return {
      loginUid: store.authData.uid,
      isAdmin: store.authData.uid
        ? store.contacts.byId[Number(store.authData.uid)]?.is_admin
        : false,
      channel: store.channels.byId[cidNum]
    };
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navs = useNavs(cidNum);
  const flattenNaves = navs.map(({ items }) => items).flat();
  const navKey = searchParams.get("nav");
  from = from ?? (searchParams.get("f") || "/");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [leaveConfirm, setLeaveConfirm] = useState(false);
  const close = () => {
    // todo: check usage
    navigate(from!);
    from = null;
  };
  const toggleDeleteConfirm = () => {
    setDeleteConfirm((prev) => !prev);
  };
  const toggleLeaveConfirm = () => {
    setLeaveConfirm((prev) => !prev);
  };
  if (!cid) return null;
  const currNav = flattenNaves.find((n) => n.name == navKey) || flattenNaves[0];
  const canDelete = isAdmin || channel?.owner === Number(loginUid);
  const canLeave = !channel?.is_public;
  const dangers: Danger[] = [];

  if (canLeave) {
    dangers.push({
      title: "Leave Channel",
      handler: toggleLeaveConfirm
    });
  }
  if (canDelete) {
    dangers.push({
      title: "Delete Channel",
      handler: toggleDeleteConfirm
    });
  }

  return (
    <>
      <StyledSettingContainer
        nav={currNav}
        closeModal={close}
        title="Channel Setting"
        navs={navs}
        dangers={dangers}
      >
        {currNav.component}
      </StyledSettingContainer>
      {deleteConfirm && <DeleteConfirmModal closeModal={toggleDeleteConfirm} id={Number(cid)} />}
      {leaveConfirm && <LeaveChannel closeModal={toggleLeaveConfirm} id={cidNum} />}
    </>
  );
}
