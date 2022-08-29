import styled from "styled-components";
export const StyledHeader = styled.header`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
export const StyledChannelChat = styled.article`
  padding: 18px 16px;
  width: 100%;
  height: 100%;
  height: -webkit-fill-available;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-anchor: auto;
  > .info {
    padding-top: 62px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    .title {
      font-weight: bold;
      font-size: 36px;
      line-height: 44px;
    }
    .desc {
      color: #78787c;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
  }
`;
