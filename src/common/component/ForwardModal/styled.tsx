import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  max-height: 514px;
  min-height: 400px;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
  border-radius: var(--br);
  transition: all 0.5s ease;
  overflow: hidden;
  .left {
    width: 276px;
    box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
    .search {
      position: sticky;
      top: 0;
      z-index: 99;
      background: #fff;
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
      padding: 16px;
      width: calc(100% - 1px);
      input {
        outline: none;
        width: -webkit-fill-available;
        padding: 10px 8px;
        font-size: 14px;
        line-height: 20px;
        background: rgba(0, 0, 0, 0.08);
        border-radius: var(--br);
      }
    }
    .users {
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
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
    align-items: flex-start;
    padding: 16px;
    box-sizing: border-box;
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #344054;
      margin-bottom: 16px;
    }
    .selected {
      width: 100%;
      height: 260px;
      padding: 10px 0;
      overflow: scroll;
      .item {
        position: relative;
        .remove {
          cursor: pointer;
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .msgs {
      border-radius: var(--br);
      padding: 8px;
      max-height: 200px;
      overflow: auto;
      background-color: #f4f4f5;
      width: 280px;
      margin-bottom: 4px;
      > .reply {
        background: none;
      }
    }
    .input {
      margin-bottom: 32px;
    }
    .btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
    }
  }
`;
export default StyledWrapper;
