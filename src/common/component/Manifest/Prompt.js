// import React from "react";
import styled from "styled-components";
import Modal from "../Modal";
import IconClose from "../../../assets/icons/close.svg";
import Button from "../../component/styled/Button";
const Styled = styled.div`
  position: relative;
  margin-top: 15px;
  pointer-events: all;
  width: 406px;
  padding: 16px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;
  .tip {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #344054;
    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
    .desc {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;
export default function Prompt({ handleInstall, closePrompt }) {
  return (
    <Modal mask={false}>
      <Styled>
        <IconClose className="close" onClick={closePrompt} />
        <div className="tip">
          <h2 className="title">Install web app on desktop?</h2>
          <p className="desc">Add to desktop for quick access to this app.</p>
        </div>
        <div className="btns">
          <Button className="ghost cancel small" onClick={closePrompt}>
            Cancel
          </Button>
          <Button className="main small" onClick={handleInstall}>
            Install
          </Button>
        </div>
      </Styled>
    </Modal>
  );
}
