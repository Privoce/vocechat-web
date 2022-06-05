import styled from "styled-components";
import toast from "react-hot-toast";
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";

const StyledSpaceNameStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .secondaryText {
  color: #667085;
 }

 > .button {
  margin-top: 24px;
 }
`;

export default function SpaceNameStep({ step, setStep, data, setData }) {
 return (
  <StyledSpaceNameStep>
   <span className="primaryText">Create a new server</span>
   <span className="secondaryText">
    Servers are shared environments where teams can work on projects and chat.
   </span>
   <StyledInput
    className="input"
    placeholder="Enter server name"
    value={data.spaceName}
    onChange={(e) =>
     setData({
      ...data,
      spaceName: e.target.value
     })
    }
   />
   <StyledButton
    className="button"
    onClick={() => {
     // Verification for space name
     if (data.spaceName === "") {
      toast.error("Please enter server name!");
      return;
     }
     setStep(step + 1);
    }}
   >
    Create Server
   </StyledButton>
  </StyledSpaceNameStep>
 );
}
