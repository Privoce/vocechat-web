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
    gap: 32px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &.inputs {
          flex-direction: column;
          gap: 8px;
        }
        .title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .txt {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            .icon {
              cursor: pointer;
            }
          }
          .desc {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #667085;
          }
        }
      }
    }
  }
  .tip {
    display: flex;
    gap: 8px;
    align-items: center;
    .link {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #06b6d4;
    }
  }
`;

export default StyledContainer;
