import styled from "styled-components";
import StyledModal from "../styled/Modal";
const StyledWrapper = styled(StyledModal)`
  .list {
    padding-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .item {
      padding: 16px;
      border: 1px solid rgba(116, 127, 141, 0.2);
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 16px;
      min-width: 473px;
      .thumb {
        object-fit: cover;
        width: 64px;
        height: 64px;
        border-radius: 6px;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        .name {
          font-style: normal;
          .input {
            user-select: text;
            line-height: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-right: 8px;
          }
          .tip {
            line-height: 18px;
            font-size: 12px;
            color: #78787c;
          }
        }
        .size {
          font-size: 14px;
          line-height: 20px;
          color: #616161;
        }
      }
    }
  }
`;
export default StyledWrapper;
