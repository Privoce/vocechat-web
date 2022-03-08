import styled from "styled-components";
const StyledMsg = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 4px;
  margin: 8px 0;
  border-radius: 8px;
  &:hover,
  &.preview {
    background: #f5f6f7;
    .cmds {
      visibility: visible;
    }
  }
  &.menu {
    z-index: 9;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .reply {
      color: #aaa;
      font-size: 12px;
      margin-bottom: -10px;
      /* padding-left: 10px; */
    }
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
      .likes {
        display: flex;
        gap: 8px;
        font-size: 16px;
        /* align-items: center; */
        .like {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          em {
            font-size: 12px;
            color: #999;
          }
          /* &:after {
            content: attr(data-count);
            position: absolute;
            top: -4px;
            right: -8px;
            font-size: 12px;
            color: #999;
          } */
        }
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
      .edited {
        margin-left: 5px;
        color: #999;
        font-size: 10px;
      }
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
