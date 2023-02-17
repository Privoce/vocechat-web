import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import StyledSettingContainer from "../../common/component/StyledSettingContainer";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useNavs from "./navs";
import { useAppSelector } from "../../app/store";
import { useTranslation } from "react-i18next";

let from: string = "";

export default function DMSetting() {
  // const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const { uid = 0, nav: navKey } = useParams();
  const { loginUser } = useAppSelector((store) => {
    return {
      loginUser: store.authData.user,
      user: uid ? store.users.byId[+uid] : undefined
    };
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navs = useNavs(+uid);
  const flattenNavs = navs
    .map(({ items }) => {
      return items;
    })
    .flat();
  from = from ? from : searchParams.get("f") || "/";
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const close = () => {
    navigate(from);
    from = "";
  };
  const toggleDeleteConfirm = () => {
    setDeleteConfirm((prev) => !prev);
  };
  if (!uid) return null;
  const currNav = flattenNavs.find((n) => n.name == navKey);
  const canDelete = loginUser?.is_admin;

  return (
    <>
      <StyledSettingContainer
        pathPrefix={`/setting/dm/${uid}`}
        nav={currNav}
        closeModal={close}
        title="DM Setting"
        navs={navs}
        dangers={
          canDelete ? [{
            title: ct("action.remove_user"),
            handler: toggleDeleteConfirm
          }] : []
        }
      >
        {navKey ? currNav?.component : null}
      </StyledSettingContainer>
      {deleteConfirm && <DeleteConfirmModal closeModal={toggleDeleteConfirm} id={+uid} />}
    </>
  );
}
