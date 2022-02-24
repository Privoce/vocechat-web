// import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearAuthData } from "../../../app/slices/auth.data";
import { toggleSetting } from "../../../app/slices/ui";
// import BASE_URL from "../../app/config";
import { useLazyLogoutQuery } from "../../../app/services/auth";
import Button from "../StyledButton";
const StyledConfirm = styled.div`
  padding: 32px;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 8px;
  background-color: #fff;
  .title {
    font-weight: 600;
    font-size: 20px;
    color: #374151;
    margin-bottom: 16px;
  }
  .desc {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
    margin-bottom: 64px;
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
  }
`;
import Modal from "../Modal";
export default function LogoutConfirmModal({ closeModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading, isSuccess }] = useLazyLogoutQuery();
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSetting());
      dispatch(clearAuthData());
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <Modal id="modal-modal">
      <StyledConfirm className="animate__animated animate__fadeInDown animate__faster">
        <h3 className="title">Log Out</h3>
        <p className="desc">Are you sure want to log out this account?</p>
        <div className="btns">
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleLogout} className="danger">
            {isLoading ? "Logouting" : `Log Out`}
          </Button>
        </div>
      </StyledConfirm>
    </Modal>
  );
}
