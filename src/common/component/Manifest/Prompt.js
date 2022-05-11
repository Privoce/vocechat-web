// import React from "react";
import styled from "styled-components";
import Modal from "../Modal";
import Button from "../../component/styled/Button";

const Styled = styled.div`
  margin-top: 15px;
  pointer-events: all;
  width: 300px;
  padding: 16px 32px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;
  .tip {
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #333;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .desc {
      font-size: 12px;
      color: #666;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
`;
export default function Prompt({ handleInstall, closePrompt }) {
  return (
    <Modal mask={false}>
      <Styled>
        <div className="tip">
          <h2 className="title">Add this Web APP</h2>
          <p className="desc">Add to your PC and open like native APP</p>
        </div>
        <div className="btns">
          <Button className="main small" onClick={handleInstall}>
            Install
          </Button>
          <Button className="ghost small" onClick={closePrompt}>
            Cancel
          </Button>
        </div>
      </Styled>
    </Modal>
  );
}
