import styled from "styled-components";

const StyledOnboardingPage = styled.div`
  height: 100vh;
  overflow-y: auto;

  > .navigator {
    position: absolute;
    top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;
    z-index: 10;

    > .node,
    > .arrow {
      font-weight: 400;
      font-size: 14px;
      line-height: 28px;
      color: #101828;
      cursor: default;
      transition: all 150ms ease-in-out;

      &.disabled {
        color: #d0d5dd;
      }

      &.emphasized {
        font-weight: 600;
      }

      &.clickable {
        cursor: pointer;

        &:hover {
          color: #717180;
        }
      }
    }
  }

  > .swiper {
    height: 100%;
  }
`;

export default StyledOnboardingPage;
