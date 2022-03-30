import styled from "styled-components";
const Styled = styled.div`
  background: #f3f4f6;
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  border-radius: 6px;
  width: 370px;
  max-height: 281px;
  height: fit-content;
  overflow: hidden;
  &.flex {
    width: 100%;
  }
  .basic {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    .icon {
      width: 36px;
      height: 48px;
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      .name {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #1c1c1e;
      }
      .details {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: #616161;
        display: flex;
        gap: 16px;
        .from strong {
          font-weight: bold;
        }
      }
    }
    .download {
      white-space: nowrap;
    }
  }
  .preview {
    /* todo */
  }
`;
export default Styled;
