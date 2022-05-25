import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  width: 432px;
  gap: 4px;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .name {
    user-select: text;
    font-weight: bold;
    font-size: 18px;
    line-height: 100%;
    color: #1c1c1e;
  }
  .email {
    user-select: text;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #98a2b3;
  }
  .intro {
    color: #344054;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  .icons {
    margin-top: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    .icon {
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #22ccee;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 4px;
      background: #f9fafb;
      border-radius: 8px;
      width: 128px;
      padding: 14px 0 12px 0;

      &:not(.disabled):hover {
        background: #f2f4f7;
      }
      &.call,
      &.more {
        svg path {
          fill: #22ccee;
        }
      }
      &.disabled {
        color: #ccc;
        svg path {
          fill: #ccc;
        }
      }
      .txt {
        user-select: none;
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
  }
  &.card {
    padding: 16px;
    width: 280px;
    background: #ffffff;
    box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1),
      0px 10px 10px rgba(31, 41, 55, 0.04);
    border-radius: 6px;
    .icons {
      padding-bottom: 2px;
    }
  }
`;

export default StyledWrapper;
