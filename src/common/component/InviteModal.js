// import React from 'react'
import styled from "styled-components";
import useInviteLink from "../hook/useInviteLink";
import CloseIcon from "../../assets/icons/close.svg";
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
  border-radius: var(--br);
  padding: 0;
  min-width: 408px;
  > .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #374151;
    padding: 16px;
    .close {
      cursor: pointer;
    }
  }

  .body {
    padding: 16px;
    box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.06);
    .input {
      position: relative;
      button {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
      }
      input {
        padding-right: 80px;
      }
    }
    > .invite {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;
      /* position: relative; */
    }
    > .link {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
      /* position: relative; */
    }
    label {
      color: #6b7280;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
    > .tip {
      color: #344054;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      button {
        background: none;
        border: none;
        color: #22ccee;
      }
    }
  }
`;
import Modal from "./Modal";
import Button from "./styled/Button";
import Input from "./styled/Input";
export default function InviteModal({ title, closeModal }) {
  const {
    enableSMTP,
    linkCopied,
    link,
    copyLink,
    generateNewLink,
    generating,
  } = useInviteLink();
  return (
    <Modal>
      <Styled>
        <h2 className="title">
          Invite friends to #{title}{" "}
          <CloseIcon className="close" onClick={closeModal} />
        </h2>
        <div className="body">
          <div className="invite">
            <label htmlFor="">Invite by Email</label>
            <div className="input">
              <Input
                disabled={!enableSMTP}
                type="email"
                className="higher"
                placeholder={enableSMTP ? "Enter Email" : "Enable SMTP First"}
              />
              <Button disabled={!enableSMTP} className="ghost small">
                Invite
              </Button>
            </div>
          </div>
          <div className="link">
            <label htmlFor="">Or Send invite link to your friends</label>
            <div className="input">
              <Input className="higher" placeholder="Generating" value={link} />
              <Button className="small" onClick={copyLink}>
                {linkCopied ? `Copied` : `Copy`}
              </Button>
            </div>
          </div>
          <div className="tip">
            Invite link expires in 7 days.{" "}
            <button
              disabled={generating}
              className="new"
              onClick={generateNewLink}
            >
              Generate New Link
            </button>
          </div>
        </div>
      </Styled>
    </Modal>
  );
}
