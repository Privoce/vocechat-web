import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Modal from "../../Modal";
import Button from "../../styled/Button";
import Input from "../../styled/Input";
import CloseIcon from "../../../../assets/icons/close.svg";

const StyledWrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  padding: 16px;
  width: 406px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #344054;
    width: 100%;
    .close {
      cursor: pointer;
    }
  }
  .input {
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #475467;
    }
  }
  .btns {
    margin-top: 32px;
    gap: 16px;
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
`;

export default function EditFileDetails({
  name,
  closeModal,
  updateName
}: {
  name: string;
  closeModal: (p?: any) => void;
  updateName: (name: string) => void;
}) {
  const [fileName, setFileName] = useState(name);
  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFileName(evt.target.value);
  };
  const handleUpdate = () => {
    updateName(fileName);
    closeModal();
  };
  return (
    <Modal>
      <StyledWrapper>
        <h4 className="title">
          File Details <CloseIcon className="close" onClick={closeModal} />
        </h4>
        <div className="input">
          <label htmlFor="name">Name</label>
          <Input id="name" value={fileName} onChange={handleNameChange} />
        </div>
        <div className="btns">
          <Button className="ghost cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </div>
      </StyledWrapper>
    </Modal>
  );
}
