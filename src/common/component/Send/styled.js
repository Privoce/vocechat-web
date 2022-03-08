import styled from "styled-components";

const StyledSend = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: #e5e7eb;
  border-radius: 8px;
  width: calc(100% - 32px);
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 4px 18px;
  /* margin: 0 16px; */
  &.reply {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .addon {
    cursor: pointer;
    position: relative;
    input {
      opacity: 0;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .input {
    width: 100%;
    position: relative;
    .content {
      resize: unset;
      outline: none;
      padding: 4px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #616161;
      width: 100%;
      border: none;
      background: none;
    }
    .btn {
      cursor: pointer;
      border: none;
      border-radius: 4px;
      padding: 2px 6px;
      background: green;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .emoji {
    position: relative;
    .toggle {
      font-size: 22px;
      border: none;
      background: none;
    }
    .picker {
      position: absolute;
      top: -20px;
      right: -15px;
      transform: translateY(-100%);
    }
  }
  .reply {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #f2f2f5;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-100%);
    width: 100%;
    padding: 6px 18px;
    .txt {
      color: #aaa;
      font-size: 12px;
      em {
        font-weight: bold;
        color: #333;
        padding: 0 5px;
      }
    }
  }
`;

export default StyledSend;
