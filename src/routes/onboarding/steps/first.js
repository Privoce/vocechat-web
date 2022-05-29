import styled from "styled-components";
import StyledButton from "../../../common/component/styled/Button";
import PlayIcon from "../../../assets/icons/play.svg?url";

const StyledFirstStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`;

export default function FirstStep({ onButtonClick }) {
 return (
  <StyledFirstStep>
   <span className="primaryText">Welcome to your Rustchat!</span>
   <span className="secondaryText">
    Everything in this space is owned by you. Let’s set up your space!
   </span>
   <StyledButton className="startButton" onClick={onButtonClick}>
    <img src={PlayIcon} alt="play icon" />
    <span>Start</span>
   </StyledButton>
  </StyledFirstStep>
 );
}
