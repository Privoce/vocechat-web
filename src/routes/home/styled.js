import styled from "styled-components";
const StyledWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f6f7;
  > .col {
    height: 100%;
    display: flex;
    flex-direction: column;
    &.left {
      position: relative;
      /* background: #0891B2; */
      width: 64px;
      box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.1);
      transition: all 0.5s ease-in;
      &.expand {
        width: 180px;
      }
    }
    &.right {
      width: 100%;
    }
    > .nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 24px 8px 10px 8px;
      .link {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        padding: 10px 8px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #4b5563;
        border-radius: 8px;
        &:hover,
        &.active {
          background-color: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
`;

export default StyledWrapper;
