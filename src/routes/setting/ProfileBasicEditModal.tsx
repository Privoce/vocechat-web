import { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import Input from "../../common/component/styled/Input";
import { useUpdateInfoMutation } from "../../app/services/user";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";
import Modal from "../../common/component/Modal";

const StyledEdit = styled(StyledModal)`
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
`;

interface Props {
  label?: string;
  valueKey?: string;
  value?: string;
  title?: string;
  intro?: string;
  closeModal: () => void;
}

const ProfileBasicEditModal: FC<Props> = ({
  label = "Username",
  valueKey = "name",
  value = "",
  title = "Change your username",
  intro = "Enter a new username and your existing password.",
  closeModal
}) => {
  const [input, setInput] = useState(value);
  // const dispatch = useDispatch();
  const [update, { isLoading, isSuccess }] = useUpdateInfoMutation();
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
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
      <StyledEdit
        title={title}
        description={intro}
        buttons={
          <>
            <Button className="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>{isLoading ? "Updating" : `Done`}</Button>
          </>
        }
      >
        <div className="input">
          <label htmlFor={valueKey}>{label}</label>
          <Input name={valueKey} value={input} onChange={handleChange}></Input>
        </div>
      </StyledEdit>
    </Modal>
  );
};

export default ProfileBasicEditModal;
