// import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useNavigate, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleChannelSetting } from "../../../app/slices/ui";
import { deleteChannel } from "../../../app/slices/channels";
import Modal from "../Modal";
// import BASE_URL from "../../app/config";
import { useLazyRemoveChannelQuery } from "../../../app/services/channel";
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

export default function DeleteConfirmModal({ id, closeModal }) {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const pathMatched = useMatch(`/chat/channel/${id}`);
  const [removeChannel, { isLoading, isSuccess }] = useLazyRemoveChannelQuery();
  const handleDelete = () => {
    removeChannel(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("delete channel successfully!");
      dispatch(deleteChannel(id));
      dispatch(toggleChannelSetting());
      if (pathMatched) {
        navigateTo("/chat");
      }
    }
  }, [isSuccess, id, pathMatched]);
  if (!id) return null;
  return (
    <Modal id="modal-modal">
      <StyledConfirm className="animate__animated animate__fadeInDown animate__faster">
        <h3 className="title">Delete Channel</h3>
        <p className="desc">Are you sure want to delete this channel?</p>
        <div className="btns">
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleDelete} className="danger">
            {isLoading ? "Deleting" : `Delete`}
          </Button>
        </div>
      </StyledConfirm>
    </Modal>
  );
}
