import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    max-width: 440px;
    padding: 32px 40px 32px 40px;
    box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    border-radius: 12px;
    .tips {
      display: flex;
      flex-direction: column;
      align-items: center;
      .logo {
        width: 56px;
        height: 56px;
        margin-bottom: 28px;
        border-radius: 50%;
      }
      .title {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #101828;
        margin-bottom: 8px;
      }
      .desc {
        text-align: center;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #667085;
        margin-bottom: 24px;
      }
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 360px;
    }
    .or {
      border: none;
      position: relative;
      height: 1px;
      background-color: #e4e7ec;
      margin: 26px 0;
      overflow: visible;
      &:after {
        padding: 4px;
        background-color: #fff;
        content: "OR";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 14px;
        line-height: 20px;
        color: #667085;
      }
    }
    button {
      width: 100%;
    }
  }
`;

export default StyledWrapper;
