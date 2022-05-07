import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Styled = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 4px;
  &:hover,
  &.active {
    background: rgba(116, 127, 141, 0.1);
  }
  > .name {
    display: flex;
    align-items: center;
    gap: 8px;
    .txt {
      color: #1c1c1e;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.read {
        color: #616161;
      }
    }
  }
  > .icons {
    display: flex;
    align-items: center;
    gap: 8px;
    > .icon {
      display: none;
      width: 16px;
      height: 16px;
      &:hover path {
        fill: #667085;
      }
    }
    > .badge {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      min-width: 20px;
      border-radius: 50%;
      background: #22ccee;
      font-weight: 900;
      font-size: 10px;
      line-height: 10px;
      &.mention {
        background: #f97066;
      }
      &.dot {
        min-width: unset;
        width: 6px;
        height: 6px;
        padding: 0;
      }
    }
  }
  &.muted {
    .name .txt {
      color: #d0d5dd;
    }
    .icons .badge {
      background: #bfbfbf;
    }
  }
  &:hover > .icons {
    > .badge {
      display: none;
    }
    > .icon {
      display: flex;
    }
  }
`;
export default Styled;
