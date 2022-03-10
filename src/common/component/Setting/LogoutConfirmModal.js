// import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { toggleSetting } from "../../../app/slices/ui";
// import BASE_URL from "../../app/config";
import StyledModal from "../styled/Modal";
import Button from "../styled/Button";
import Checkbox from "../styled/Checkbox";
import useLogout from "../../hook/useLogout";
const StyledConfirm = styled(StyledModal)`
  .clear {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
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
`;
import Modal from "../Modal";
export default function LogoutConfirmModal({ closeModal }) {
  const dispatch = useDispatch();
  const [clearLocal, setClearLocal] = useState(false);
  const { logout, exited, exiting, clearLocalData } = useLogout();
  const handleLogout = () => {
    logout();
  };
  const handleCheck = (evt) => {
    setClearLocal(evt.target.checked);
  };
  useEffect(() => {
    if (exited) {
      if (clearLocal) {
        console.log("clear all store");
        clearLocalData();
      }
      // closeModal();
      dispatch(toggleSetting());
    }
  }, [exited, clearLocal]);
  return (
    <Modal id="modal-modal">
      <StyledConfirm
        title="Log Out"
        description="Are you sure want to log out this account?"
        buttons={
          <>
            {" "}
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={handleLogout} className="danger">
              {exiting ? "Logging out" : `Log Out`}
            </Button>
          </>
        }
        className="animate__animated animate__fadeInDown animate__faster"
      >
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
      </StyledConfirm>
    </Modal>
  );
}
