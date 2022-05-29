import styled from "styled-components";
import StyledRadio from "../../../common/component/styled/Radio";

const StyledInviteRuleStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .input:not(:last-child) {
  margin-bottom: 20px;
 }
`;

export default function InviteRuleStep({ data, setData }) {
 return (
  <StyledInviteRuleStep>
   <span className="primaryText">Last step: invite others!</span>
   <span className="secondaryText">Firstly, who can sign up to this server?</span>
   <StyledRadio
    options={["Everyone", "Invitation link only"]}
    value={data.inviteRule}
    onChange={(v) =>
     setData({
      ...data,
      inviteRule: v
     })
    }
   />
  </StyledInviteRuleStep>
 );
}
