import styled from "styled-components";
import StyledRadio from "../../../common/component/styled/Radio";
import StyledButton from "../../../common/component/styled/Button";

const StyledInviteRuleStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .input:not(:nth-last-child(2)) {
  margin-bottom: 20px;
 }
`;

export default function InviteRuleStep({ step, setStep, data, setData }) {
 return (
  <StyledInviteRuleStep>
   <span className="primaryText">Last step: invite others!</span>
   <span className="secondaryText">Firstly, who can sign up to this server?</span>
   <StyledRadio
    options={["Everyone", "Invitation link only"]}
    value={data.inviteRule}
    onChange={(v) => {
     setData({
      ...data,
      inviteRule: v
     });
     setTimeout(() => {
      setStep(step + 1);
     }, 750);
    }}
   />
   <StyledButton className="button border_less ghost" onClick={() => setStep(step + 1)}>
    Skip
   </StyledButton>
  </StyledInviteRuleStep>
 );
}
