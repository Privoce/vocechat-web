import styled from "styled-components";
const Styled = styled.div`
  height: 100vh;
  display: flex;
  background-color: #fff;
  margin: 8px 24px 10px 0;
  border-radius: 16px;
  overflow: auto;
  .left {
    padding: 8px;
    min-width: 268px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    .filters {
      display: flex;
      flex-direction: column;
      gap: 2px;
      .filter {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: var(--br);
        .icon {
          width: 15px;
          height: 20px;
        }
        .txt {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #667085;
        }
        &:hover,
        &.active {
          background: rgba(116, 127, 141, 0.2);
        }
      }
    }
  }
  .right {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: scroll;
    .container {
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      > .favorite {
        background: #f2f4f7;
      }
      .tip {
        display: inline-flex;
        align-items: center;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #bfbfbf;
        .from {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-right: 8px;
          &.channel,
          &.user strong {
            font-weight: 600;
            color: #344054;
            .icon {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }
`;

export default Styled;
