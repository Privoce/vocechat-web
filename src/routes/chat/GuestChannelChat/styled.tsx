import styled from "styled-components";
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
