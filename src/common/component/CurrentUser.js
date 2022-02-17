import { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineCaretDown, AiOutlineSound } from "react-icons/ai";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearAuthData } from "../../app/slices/auth.data";
import BASE_URL from "../../app/config";
import { useLazyLogoutQuery } from "../../app/services/auth";
import Avatar from "./Avatar";
const StyledWrapper = styled.div`
  background-color: #e5e5e5;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .profile {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .toggle {
    }
  }
  .settings {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      cursor: pointer;
    }
  }
`;
export default function CurrentUser({ expand = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isSuccess }] = useLazyLogoutQuery();
  const { user } = useSelector((store) => store.authData);
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearAuthData());
      navigate("/login");
    }
  }, [isSuccess]);

  if (!user) return null;
  const { name, uid } = user;
  return (
    <StyledWrapper>
      <div className="profile" title={name}>
        <Avatar
          onDoubleClick={handleLogout}
          title={name}
          url={`${BASE_URL}/resource/avatar?uid=${uid}`}
          id={uid}
          alt="user avatar"
          className="avatar"
        />
        <AiOutlineCaretDown className="toggle" width={20} color="#C4C4C4" />
      </div>
      {expand && (
        <div className="settings">
          <AiOutlineSound className="icon" size={15} color="#1C1C1E" />
          <MdOutlineKeyboardVoice className="icon" size={15} color="#1C1C1E" />
        </div>
      )}
    </StyledWrapper>
  );
}
