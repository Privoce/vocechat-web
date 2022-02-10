import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 8px;
  .head {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 8px;
  }
  .intro {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #6b7280;
  }
  .list {
    padding-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .item {
      padding: 16px;
      border: 1px solid rgba(116, 127, 141, 0.2);
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 16px;
      min-width: 473px;
      .thumb {
        object-fit: cover;
        width: 64px;
        height: 64px;
        border-radius: 6px;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        .name {
          font-style: normal;
          .input {
            user-select: text;
            line-height: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-right: 8px;
          }
          .tip {
            line-height: 18px;
            font-size: 12px;
            color: #78787c;
          }
        }
        .size {
          font-size: 14px;
          line-height: 20px;
          color: #616161;
        }
      }
    }
  }
  .btns {
    padding-top: 32px;
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    width: 100%;
    .btn {
      color: #fff;
      padding: 8px 16px;
      background: #1fe1f9;
      /* shadow-base */

      box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
      border-radius: 4px;
      &.cancel {
        color: #333;
        border: 1px solid #e5e7eb;
        background-color: #fff;
      }
    }
  }
`;
export default StyledWrapper;
