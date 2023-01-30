import styled from "styled-components";

const StyledMsg = styled.div`
width: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 4px 8px;
  margin: 8px 0;
  border-radius: 8px;
  &[data-highlight="true"] {
    background: #f5f6f7;
  }
  &.auto_delete {
    background: #f1d1ca50;
  }
  &.pinned {
    background: #ecfdff;
  }
  &:hover,
  &.contextVisible,
  &.preview {
    background: #f5f6f7;
    .cmds {
      visibility: visible;
    }
  }
  &.readonly:hover {
    background: none;
  }
  > .avatar {
    flex-shrink: 0;
    cursor: pointer;
    width: 40px;
    height: 40px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  > .details {
    width: 100%;
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
      white-space: pre-wrap;
      .edited {
        margin-left: 5px;
        color: #999;
        font-size: 10px;
      }
      &.sending {
        opacity: 0.9;
      }
      > .link {
        text-decoration: none;
        border-radius: 2px;
        /* background-color: #f5feff; */
        padding: 2px;
        color: #1fe1f9;
      }
      /* 下载图标颜色 */
      .download_icon.gray{
        path{
            fill: #616161;
          }
      }
    }
  }
  &.archive {
    gap: 8px;
    > .details {
      gap: 0;
      .up .name {
        font-weight: 600;
        color: #475467;
      }
      .down {
        color: #475467;
      }
    }
  }
  &.pinned {
    padding-top: 26px;
    > .details {
      position: relative;
      &:before {
        position: absolute;
        left: 0;
        top: -4px;
        transform: translateY(-100%);
        content: attr(data-pin-tip);
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: #98a2b3;
      }
    }
  }
`;

export default StyledMsg;
