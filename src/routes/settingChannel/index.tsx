import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useAppSelector } from "@/app/store";
import LeaveChannel from "@/components/LeaveChannel";
import StyledSettingContainer from "@/components/StyledSettingContainer";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useNavs from "./navs";
import { shallowEqual } from "react-redux";

let from: string = "";

export default function ChannelSetting() {
  const { t } = useTranslation("setting");
  const { cid = 0, nav: navKey } = useParams();
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const channel = useAppSelector(
    (store) => (cid ? store.channels.byId[+cid] : undefined),
    shallowEqual
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navs = useNavs(+cid);
  const flattenNavs = navs
    .map(({ items }) => {
      return items;
    })
    .flat();
  from = from ? from : searchParams.get("f") || "/";
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [leaveConfirm, setLeaveConfirm] = useState(false);
  const close = () => {
    navigate(from);
    from = "";
  };
  const toggleDeleteConfirm = () => {
    setDeleteConfirm((prev) => !prev);
  };
  const toggleLeaveConfirm = () => {
    setLeaveConfirm((prev) => !prev);
  };
  if (!cid) return null;
  const currNav = flattenNavs.find((n) => n.name == navKey);
  const canDelete = loginUser?.is_admin || channel?.owner == loginUser?.uid;
  const canLeave = !channel?.is_public;

  return (
    <>
      <StyledSettingContainer
        pathPrefix={`/setting/channel/${cid}`}
        nav={currNav}
        closeModal={close}
        title="Channel Settings"
        navs={navs}
        dangers={[
          canLeave && {
            title: t("channel.leave"),
            handler: toggleLeaveConfirm
          },
          canDelete && {
            title: t("channel.delete"),
            handler: toggleDeleteConfirm
          }
        ]}
      >
        {navKey ? currNav?.component : null}
      </StyledSettingContainer>
      {deleteConfirm && <DeleteConfirmModal closeModal={toggleDeleteConfirm} id={+cid} />}
      {leaveConfirm && <LeaveChannel closeModal={toggleLeaveConfirm} id={+cid} />}
    </>
  );
}
