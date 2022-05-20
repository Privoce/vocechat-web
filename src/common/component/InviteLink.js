// import { useEffect } from "react";
import styled from "styled-components";
import useInviteLink from "../hook/useInviteLink";
import Input from "./styled/Input";
import Button from "./styled/Button";
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 32px;
  .tip {
    font-weight: 500;
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .link {
    width: 512px;
    margin-bottom: 12px;
    position: relative;
    button {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      padding-right: 75px;
    }
  }
  .sub_tip {
    margin-left: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #616161;
    margin-bottom: 20px;
  }
`;
export default function InviteLink() {
  const {
    generating,
    link,
    linkCopied,
    copyLink,
    generateNewLink,
  } = useInviteLink();
  const handleNewLink = () => {
    generateNewLink();
  };
  return (
    <StyledWrapper>
      <span className="tip">
        Share this link to invite people to this server.
      </span>
      <div className="link">
        <Input readOnly placeholder="Generating" value={link} />
        <Button onClick={copyLink} className="small">
          {linkCopied ? "Copied" : `Copy`}
        </Button>
      </div>
      <span className="sub_tip">Invite link expires in 7 days.</span>
      <Button className="ghost" disabled={generating} onClick={handleNewLink}>
        {generating ? `Generating` : `Generate New Link`}
      </Button>
    </StyledWrapper>
  );
}
