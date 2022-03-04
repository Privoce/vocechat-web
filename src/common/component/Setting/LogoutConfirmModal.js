// import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSetting } from "../../../app/slices/ui";
import { clearAuthData } from "../../../app/slices/auth.data";
import { clearMark } from "../../../app/slices/visit.mark";
import { clearChannels } from "../../../app/slices/channels";
import { clearContacts } from "../../../app/slices/contacts";
import { clearChannelMsg } from "../../../app/slices/message.channel";
import { clearUserMsg } from "../../../app/slices/message.user";
import { clearPendingMsg } from "../../../app/slices/message.pending";
// import BASE_URL from "../../app/config";
import { useLazyLogoutQuery } from "../../../app/services/auth";
import Button from "../styled/Button";
import Checkbox from "../styled/Checkbox";
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
  .desc,
  .clear {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
    margin-bottom: 12px;
  }
  .clear {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .txt {
      cursor: pointer;
      color: orange;
      margin-right: 12px;
    }
    input {
      cursor: pointer;
    }
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
  const [clearLocal, setClearLocal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading, isSuccess }] = useLazyLogoutQuery();
  const handleLogout = () => {
    logout();
  };
  const handleCheck = (evt) => {
    setClearLocal(evt.target.checked);
  };
  useEffect(() => {
    if (isSuccess) {
      if (clearLocal) {
        console.log("clear all store");
        dispatch(clearMark());
        dispatch(clearChannelMsg());
        dispatch(clearUserMsg());
        dispatch(clearChannels());
        dispatch(clearContacts());
        dispatch(clearPendingMsg());
      }
      dispatch(clearAuthData());
      // closeModal();
      dispatch(toggleSetting());
      navigate("/login");
    }
  }, [isSuccess, clearLocal]);
  return (
    <Modal id="modal-modal">
      <StyledConfirm className="animate__animated animate__fadeInDown animate__faster">
        <h3 className="title">Log Out</h3>
        <p className="desc">Are you sure want to log out this account?</p>
        <div className="clear">
          <label htmlFor="clear_cb" className="txt">
            Clear local data
          </label>
          <Checkbox
            name="clear_cb"
            checked={clearLocal}
            onChange={handleCheck}
          />
        </div>
        <div className="btns">
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleLogout} className="danger">
            {isLoading ? "Logging out" : `Log Out`}
          </Button>
        </div>
      </StyledConfirm>
    </Modal>
  );
}
