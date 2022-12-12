import styled from "styled-components";

import StyledButton from "../../../common/component/styled/Button";
import PlayIcon from "../../../assets/icons/play.svg?url";
import { useTranslation } from "react-i18next";
import { useWizard } from "react-use-wizard";

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .primaryText {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 8px;
  }

  > .secondaryText {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 24px;
  }

  > .startButton {
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
`;

export default function WelcomePage() {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const { nextStep } = useWizard();
  return (
    <StyledWrapper>
      <span className="primaryText">{t("welcome")}</span>
      <span className="secondaryText">
        {t("welcome_desc")}
      </span>
      <StyledButton className="startButton" onClick={nextStep}>
        <img src={PlayIcon} alt="play icon" />
        <span>{t("start")}</span>
      </StyledButton>
    </StyledWrapper>
  );
}
