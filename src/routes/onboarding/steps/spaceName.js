import styled from "styled-components";
import StyledInput from "../../../common/component/styled/Input";

const StyledSpaceNameStep = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 > .secondaryText {
  color: #667085;
 }
`;

export default function SpaceNameStep({ data, setData }) {
 return (
  <StyledSpaceNameStep>
   <span className="primaryText">Let’s start with name:</span>
   <span className="secondaryText">This space is called: </span>
   <StyledInput
    className="input"
    placeholder="Enter space name"
    value={data.spaceName}
    onChange={(e) =>
     setData({
      ...data,
      spaceName: e.target.value
     })
    }
   />
  </StyledSpaceNameStep>
 );
}
