import styled from "styled-components";
export const StyledHeader = styled.header`
  width: 100%;
  height: 100%;
  /* padding: 0 20px 0 10px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* tricky */
  > div {
    padding-left: 4px;
  }
  .txt {
    display: flex;
    align-items: center;
    gap: 5px;
    .title {
      font-size: 16px;
      line-height: 24px;
      color: #1c1c1e;
    }
    .desc {
      margin-left: 8px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #616161;
    }
  }
`;
export const StyledDMChat = styled.article`
  position: relative;
  width: 100%;
  padding-top: 25px;
  /* margin-bottom: 120px; */
  > .chat {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    height: calc(100vh - 56px - 80px);
    overflow-y: scroll;
    overflow-x: visible;
  }
  .placeholder {
    width: 100%;
    height: 80px;
  }
`;
