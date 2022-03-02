// import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import { useDispatch } from "react-redux";
import Input from "../styled/Input";
// import BASE_URL from "../../app/config";
import { useUpdateInfoMutation } from "../../../app/services/contact";
import Button from "../styled/Button";
const StyledEdit = styled.div`
  width: 440px;
  padding: 32px;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  }
  .input {
    margin: 48px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #6b7280;
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
import toast from "react-hot-toast";
export default function ProfileBasicEditModal({
  label = "Username",
  valueKey = "name",
  value = "",
  title = "Change your username",
  intro = "Enter a new username and your existing password.",
  closeModal,
}) {
  const [input, setInput] = useState(value);
  // const dispatch = useDispatch();
  const [update, { isLoading, isSuccess }] = useUpdateInfoMutation();
  const handleChange = (evt) => {
    setInput(evt.target.value);
  };
  const handleUpdate = () => {
    update({ [valueKey]: input });
  };
  useEffect(() => {
    if (isSuccess) {
      // todo
      toast.success("update user info successfully");
      closeModal();
    }
  }, [isSuccess]);
  return (
    <Modal id="modal-modal">
      <StyledEdit className="animate__animated animate__fadeInDown animate__faster">
        <h3 className="title">{title}</h3>
        <p className="desc">{intro}</p>
        <div className="input">
          <label htmlFor={valueKey}>{label}</label>
          <Input name={valueKey} value={input} onChange={handleChange}></Input>
        </div>
        <div className="btns">
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleUpdate} className="main">
            {isLoading ? "Updating" : `Done`}
          </Button>
        </div>
      </StyledEdit>
    </Modal>
  );
}
