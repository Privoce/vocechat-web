import styled from "styled-components";
const StyledMsg = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 4px;
  margin: 8px 0;
  border-radius: 8px;
  &:hover {
    background: #f5f6f7;
    .cmds {
      visibility: visible;
    }
  }
  .avatar {
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .up {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      .name {
        color: #06b6d4;
        font-style: normal;
        font-size: 14px;
        line-height: 20px;
      }
      .time {
        color: #bfbfbf;
        font-size: 12px;
        line-height: 18px;
      }
    }
    .down {
      user-select: text;
      color: #374151;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
      white-space: break-spaces;
      &.pending {
        opacity: 0.5;
      }
      .img {
        max-width: 400px;
      }
      a {
        border-radius: 2px;
        background-color: #f5feff;
        padding: 2px;
        color: #1fe1f9;
      }
    }
  }
`;

export default StyledMsg;
