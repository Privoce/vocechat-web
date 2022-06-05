import styled from "styled-components";
import StyledButton from "../../../common/component/styled/Button";
import PlayIcon from "../../../assets/icons/play.svg?url";

const StyledLastStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .secondaryText {
  margin-bottom: 48px;
 }

 > .tip {
  width: 560px;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 96px;

  > .strong {
   font-weight: 700;
  }
 }
`;

export default function CompletedStep({ data, step, setStep }) {
 return (
  <StyledLastStep>
   <span className="primaryText">Welcome to {data.spaceName}</span>
   <span className="secondaryText">Proudly presented by Rustchat</span>
   <span className="tip">
    More settings, including domain resolution, privileges, securities, and invites are available in{" "}
    <span className="strong">Settings</span>
   </span>
   <StyledButton className="startButton" onClick={() => setStep(step + 1)}>
    <img src={PlayIcon} alt="play icon" />
    <span>Start</span>
   </StyledButton>
  </StyledLastStep>
 );
}
