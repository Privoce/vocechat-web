import { useEffect, useState, MouseEvent } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useUpdateAvatarMutation } from "../../app/services/user";
import AvatarUploader from "../../common/component/AvatarUploader";
import ProfileBasicEditModal from "./ProfileBasicEditModal";
import RemoveAccountConfirmModal from "./RemoveAccountConfirmModal";
import UpdatePasswordModal from "./UpdatePasswordModal";
import { useAppSelector } from "../../app/store";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  .card {
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 512px;
    background: #f3f4f6;
    border-radius: 20px;
    .name {
      margin-top: 8px;
      margin-bottom: 64px;
      font-weight: bold;
      font-size: 18px;
      line-height: 28px;
      color: #27272a;
      .uid {
        font-weight: normal;
        color: #52525b;
      }
    }
    .row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      .info {
        display: flex;
        flex-direction: column;
        .label {
          font-weight: 600;
          font-size: 12px;
          line-height: 20px;
          text-transform: uppercase;
          color: #52525b;
        }
        .txt {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #52525b;
          .gray {
            color: #78787c;
          }
        }
      }
      .btn {
        background: #1fe1f9;
        border: 1px solid #1fe1f9;
      }
    }
  }
  .danger {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .head {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #374151;
    }
    .desc {
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
      margin-bottom: 16px;
    }
    .btn {
      background: #ef4444;
      border: 1px solid #ef4444;
    }
  }
  .btn {
    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 14px;
    background: #1fe1f9;
    border: 1px solid #1fe1f9;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
  }
`;
type EditField = "name" | "email" | "";
export default function MyAccount() {
  const { t } = useTranslation("member");
  const { t: ct } = useTranslation();
  const [passwordModal, setPasswordModal] = useState(false);
  const [editModal, setEditModal] = useState<EditField>("");
  const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false);
  const [uploadAvatar, { isSuccess: uploadSuccess }] = useUpdateAvatarMutation();
  const EditModalInfo = {
    name: {
      label: t("username"),
      title: t("change_name"),
      intro: t("change_name_desc")
    },
    email: {
      label: t("email"),
      title: t("change_email"),
      intro: t("change_email_desc")
    }
  };

  const loginUser = useAppSelector((store) => {
    return store.users.byId[store.authData.user?.uid || 0];
  });

  useEffect(() => {
    if (uploadSuccess) {
      toast.success(ct("tip.update"));
    }
  }, [uploadSuccess]);

  const handleBasicEdit = (evt: MouseEvent<HTMLButtonElement>) => {
    const { edit } = evt.currentTarget.dataset as { edit: EditField };
    setEditModal(edit);
  };

  const closeBasicEditModal = () => {
    setEditModal("");
  };

  const togglePasswordModal = () => {
    setPasswordModal((prev) => !prev);
  };
  const toggleRemoveAccountModalVisible = () => {
    setRemoveConfirmVisible((prev) => !prev);
  };

  if (!loginUser) return null;
  const { uid, avatar, name, email } = loginUser;
  return (
    <>
      <StyledWrapper>
        <div className="card">
          <AvatarUploader url={avatar} name={name} uploadImage={uploadAvatar} />
          <div className="name">
            {name} <span className="uid">#{uid}</span>
          </div>
          <div className="row">
            <div className="info">
              <span className="label">{t("username")}</span>
              <span className="txt">
                {name} <span className="gray"> #{uid}</span>
              </span>
            </div>
            <button data-edit="name" onClick={handleBasicEdit} className="btn">
              {ct("action.edit")}
            </button>
          </div>
          <div className="row">
            <div className="info">
              <span className="label">{t("email")}</span>
              <span className="txt">{email}</span>
            </div>
            <button data-edit="email" onClick={handleBasicEdit} className="btn">
              {ct("action.edit")}
            </button>
          </div>
          <div className="row">
            <div className="info">
              <span className="label">{t("password")}</span>
              <span className="txt">*********</span>
            </div>
            <button onClick={togglePasswordModal} className="btn">
              {ct("action.edit")}
            </button>
          </div>
        </div>
        {/* uid 1 是初始账户，不能删 */}
        {uid != 1 && (
          <div className="danger">
            <button className="btn" onClick={toggleRemoveAccountModalVisible}>
              {t("delete_account")}
            </button>
          </div>
        )}
      </StyledWrapper>
      {editModal && (
        <ProfileBasicEditModal
          type={editModal == "email" ? "email" : "text"}
          valueKey={editModal}
          {...EditModalInfo[editModal]}
          value={eval(editModal)}
          closeModal={closeBasicEditModal}
        />
      )}
      {passwordModal && <UpdatePasswordModal closeModal={togglePasswordModal} />}
      {removeConfirmVisible && (
        <RemoveAccountConfirmModal closeModal={toggleRemoveAccountModalVisible} />
      )}
    </>
  );
}
