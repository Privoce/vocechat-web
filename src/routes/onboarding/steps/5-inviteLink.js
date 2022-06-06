import styled from "styled-components";
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";
import useInviteLink from "../../../common/hook/useInviteLink";

const StyledInviteLinkStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .secondaryText {
  margin-bottom: 40px;
 }

 > .tip {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #475467;
  margin-bottom: 8px;
 }

 > .link {
  position: relative;
  background: #ffffff;
  border: 1px solid #f4f4f5;
  box-shadow: 0 1px 2px rgba(31, 41, 55, 0.08);
  border-radius: 4px;
  width: 374px;
  display: flex;

  > input {
   border: none;
   box-shadow: none;
   padding: 11px 0 11px 8px;
   font-weight: 400;
   font-size: 14px;
   line-height: 20px;
   color: #78787c;
  }

  > button {
   padding: 0 8px;
   font-weight: 500;
   font-size: 14px;
   line-height: 20px;
   color: #22ccee;
  }
 }
`;

export default function InviteLinkStep({ setStep }) {
 const { link, linkCopied, copyLink } = useInviteLink();

 return (
  <StyledInviteLinkStep>
   <span className="primaryText">Last step: invite others!</span>
   <span className="secondaryText">Now let’s invite others!</span>
   <span className="tip">Send invitation link to your future community members:</span>
   <div className="link">
    <StyledInput className="large" readOnly placeholder="Generating" value={link} />
    <StyledButton onClick={copyLink} className="ghost small border_less">
     {linkCopied ? "Copied" : `Copy`}
    </StyledButton>
   </div>
   <StyledButton className="button border_less ghost" onClick={() => setStep((prev) => prev + 1)}>
    Skip
   </StyledButton>
  </StyledInviteLinkStep>
 );
}
