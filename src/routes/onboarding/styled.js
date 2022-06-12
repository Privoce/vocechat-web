import styled from "styled-components";

const StyledOnboardingPage = styled.div`
  height: 100vh;
  overflow-y: auto;

  // shared with child components
  .primaryText,
  .secondaryText {
    text-align: center;
  }

  .primaryText {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  .secondaryText {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
  }

  .startButton {
    width: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0 12px;

    > img {
      margin-bottom: 7px;
    }

    > span {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .input {
    width: 360px;
    height: 44px;
    border: none;
    box-shadow: none;
  }

  input.input {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  }

  .button {
    width: 360px;

    &.ghost.border_less {
      width: fit-content;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #98a2b3;
      margin-top: 14px;
    }
  }
`;

export default StyledOnboardingPage;
