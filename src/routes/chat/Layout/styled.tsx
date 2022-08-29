import styled from "styled-components";
const Styled = styled.article`
  position: relative;
  width: 100%;
  background: #fff;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  > .head {
    box-sizing: border-box;
    height: 56px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  > .main {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    > .chat {
      border-bottom-right-radius: 16px;
      width: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding: 0;
      height: calc(100vh - 56px - 18px);
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
          position: relative;
          cursor: pointer;
          &.fav svg path {
            fill: #70707b;
          }
          &.active svg path {
            fill: #3f3f46;
          }
          &:not(.active):hover svg path {
            fill: #51525c;
          }
          &.badge:after {
            position: absolute;
            top: -8px;
            right: -8px;
            content: attr(data-count);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 16px;

            border-radius: 50%;
            background-color: #22ccee;
            color: #fff;
            font-weight: 900;
            font-size: 10px;
            line-height: 10px;
            text-align: center;
            color: #ffffff;
          }
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
  &.readonly .main .chat {
    height: calc(100vh - 62px - 18px);
  }
`;
export default Styled;
