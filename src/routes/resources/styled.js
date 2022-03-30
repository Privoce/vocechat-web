import styled from "styled-components";
const Styled = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .opts {
    padding: 20px 16px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  > .list {
    padding: 0 16px;
    height: 100%;
    overflow-y: scroll;
    width: 100%;

    display: flex;
    &.item {
      gap: 8px;
      flex-direction: column;
      /* align-items: flex-start; */
    }
    &.grid {
      flex-direction: row;
      flex-wrap: wrap;
      > .file_box {
        flex-direction: column;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
`;

export default Styled;
