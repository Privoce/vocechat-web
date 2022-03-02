import styled from "styled-components";
const StyledContainer = styled.div`
  position: relative;
  width: 512px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      &.row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
`;

export default StyledContainer;
