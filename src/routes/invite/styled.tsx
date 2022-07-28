import styled from "styled-components";
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    padding: 36px 40px 32px 40px;
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    border-radius: 12px;
    .tips {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 24px;
      .logo {
        width: 56px;
        height: 56px;
        margin-bottom: 28px;
      }
      .title {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #101828;
        margin-bottom: 8px;
      }
    }
    .desc {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #667085;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      input {
        width: 360px;
        background: #ffffff;
        border: 1px solid #d0d5dd;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
        padding: 10px 14px;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #667085;
      }
    }
    .btn {
      display: inline-block;
      text-align: center;
      width: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
      padding: 10px;
      background: #1fe1f9;
      border: 1px solid #1fe1f9;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 8px;
      &.google {
        color: #344054;
        border-color: #d0d5dd;
        background: none;
      }
    }
  }
`;

export default StyledWrapper;
