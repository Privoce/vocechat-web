import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  max-height: 402px;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
  border-radius: var(--br);
  transition: all 0.5s ease;
  .left {
    width: 260px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    .search {
      position: sticky;
      top: 0;
      z-index: 99;
      background: #fff;
      border-top-left-radius: var(--br);
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
      padding: 8px;
      width: calc(100% - 1px);
      input {
        outline: none;
        width: -webkit-fill-available;
        padding: 8px;
        font-size: 14px;
        line-height: 20px;
        border: none;
      }
    }
    .users {
      display: flex;
      flex-direction: column;
      height: calc(100% - 52px - 10px);
      overflow-y: scroll;
      .user {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 16px;
        width: -webkit-fill-available;
        border-radius: 4px;
        &:hover {
          background: rgba(116, 127, 141, 0.1);
        }
        > div {
          width: 100%;
        }
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    box-sizing: border-box;
    &.private {
      width: 344px;
      .desc {
        text-align: center;
      }
    }
    > .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      color: #374151;
      margin-bottom: 16px;
    }
    .desc {
      font-weight: normal;
      color: #6b7280;
      margin-bottom: 48px;
    }
    .name {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 8px;
      margin-bottom: 34px;
      .label {
        font-weight: 600;
        color: #6b7280;
      }
      .input {
        position: relative;
        input {
          width: -webkit-fill-available;
          border: 1px solid #e5e7eb;
          box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
          border-radius: 4px;
          padding: 8px;
          color: #78787c;
          padding-left: 36px;
        }
        .icon {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .private {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 50px;
      .txt {
        font-weight: 600;
        color: #6b7280;
      }
      input {
        cursor: pointer;
      }
    }
    .btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
    }
    .normal {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
export default StyledWrapper;
