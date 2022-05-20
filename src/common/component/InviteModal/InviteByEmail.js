import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import useInviteLink from "../../hook/useInviteLink";
const Styled = styled.div`
  padding: 16px 0;
  .input {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    > .copy {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      padding-right: 8px;
      background: none;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #22ccee;
      &:hover {
        color: #088ab2;
      }
    }
    input {
      padding-right: 80px;
      &.invite {
        padding-right: 50px;
      }
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
`;
import Button from "../styled/Button";
import Input from "../styled/Input";
export default function InviteByEmail({ cid = null }) {
  const [email, setEmail] = useState("");
  const {
    enableSMTP,
    linkCopied,
    link,
    copyLink,
    generateNewLink,
    generating,
  } = useInviteLink(cid);
  useEffect(() => {
    if (linkCopied) {
      toast.success("Invite Link Copied!");
    }
  }, [linkCopied]);
  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };
  return (
    <Styled>
      <div className="invite">
        <label htmlFor="">Invite by Email</label>
        <div className="input">
          <Input
            value={email}
            onChange={handleEmail}
            disabled={!enableSMTP}
            type="email"
            placeholder={enableSMTP ? "Enter Email" : "Enable SMTP First"}
          />
          <Button disabled={!enableSMTP || !email} className="send">
            Send
          </Button>
        </div>
      </div>
      <div className="link">
        <label htmlFor="">Or Send invite link to your friends</label>
        <div className="input">
          <Input
            readOnly
            className="invite"
            placeholder="Generating"
            value={link}
          />
          <button className="copy" onClick={copyLink}>
            Copy
          </button>
        </div>
      </div>
      <div className="tip">
        Invite link expires in 7 days.{" "}
        <button disabled={generating} className="new" onClick={generateNewLink}>
          Generate New Link
        </button>
      </div>
    </Styled>
  );
}
