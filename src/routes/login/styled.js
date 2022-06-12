import styled from "styled-components";
import Button from "../../common/component/styled/Button";
export const StyledSocialButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #344054;
  border: 1px solid #d0d5dd;
  background: none !important;
  .icon {
    width: 24px;
    height: 24px;
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    padding: 36px 40px 32px 40px;
    /* border: 1px solid #eee; */
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
        border-radius: 50%;
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
      width: 360px;
    }
    .or {
      border: none;
      position: relative;
      height: 1px;
      background-color: #e4e7ec;
      margin: 26px 0;
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
  }
`;

export default StyledWrapper;
