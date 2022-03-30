import styled from "styled-components";
const Styled = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 16px;
  .opts {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .list {
    height: 100%;
    overflow-y: scroll;
    width: 100%;
    gap: 8px;
    &.item {
      display: flex;
      flex-direction: column;
      /* align-items: flex-start; */
    }
    &.grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto;
    }
  }
`;

export default Styled;
