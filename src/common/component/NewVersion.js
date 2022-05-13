// import React from 'react'
import toast from "react-hot-toast";
import styled from "styled-components";
const Styled = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  strong {
    white-space: nowrap;
    font-weight: bold;
    /* padding-right: 5px; */
  }
  .btns {
    gap: 5px;
    display: flex;
  }
`;
import Button from "./styled/Button";
export default function NewVersion({ id, handleUpdate }) {
  return (
    <Styled>
      <strong>New Version</strong> Available
      <div className="btns">
        <Button className="mini main" onClick={handleUpdate}>
          Update
        </Button>
        <Button className="mini cancel" onClick={() => toast.dismiss(id)}>
          Dismiss
        </Button>
      </div>
    </Styled>
  );
}
