import styled from "styled-components";

const StyledSend = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: #f5f6f7;
  border-radius: 8px;
  width: calc(100% - 32px);
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 4px 18px;
  /* margin: 0 16px; */
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
      top: -15px;
      right: 0;
      transform: translateY(-100%);
    }
  }
`;

export default StyledSend;
