// import { useEffect } from "react";
import styled from "styled-components";
import useInviteLink from "../hook/useInviteLink";
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
    border-radius: 4px;
    padding: 3px 4px 3px 8px;
    .content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 512px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #78787c;
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
        <span title={link} className="content">
          {link}
        </span>
        <Button onClick={copyLink} className="main">
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
