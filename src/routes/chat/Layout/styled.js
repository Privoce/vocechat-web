import styled from "styled-components";
const Styled = styled.article`
  position: relative;
  width: 100%;
  background: #fff;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  > .head {
    box-sizing: content-box;
    height: 56px;
    padding: 0 20px;
    /* box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1); */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  > .main {
    height: calc(100vh - 56px - 22px);
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    > .chat {
      width: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding: 0;
      /* padding-bottom: 16px; */
      height: calc(100vh - 56px - 22px);
      > .send {
        padding: 0 16px 16px 16px;
        &.selecting {
          padding: 0;
          > .send {
            display: none;
          }
        }
      }
    }
    .members {
      box-shadow: inset 0px 10px 2px -10px rgba(0, 0, 0, 0.1);
      /* margin-top: 1px; */
      /* border-top: 1px solid transparent; */
    }
    > .aside {
      padding: 12px;
      position: absolute;
      right: 0;
      top: -56px;
      transform: translateX(100%);
      display: flex;
      flex-direction: column;
      .divider {
        border: none;
        background-color: #d4d4d4;
        width: 16px;
        height: 1px;
        margin: 18px auto;
      }
      .tools,
      .apps {
        display: flex;
        flex-direction: column;
      }
      .tools {
        gap: 24px;
        .tool {
          cursor: pointer;
        }
      }
      .apps {
        gap: 15px;
      }
    }
  }
  .drag_tip {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    /* pointer-events: none; */
    &.visible {
      visibility: visible;
    }
    .box {
      padding: 16px;
      filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
      border-radius: 8px;
      background: #52edff;
      .inner {
        padding: 16px;
        padding-top: 64px;
        border: 2px dashed #a5f3fc;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .head {
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
        }
        .intro {
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
`;
export default Styled;
