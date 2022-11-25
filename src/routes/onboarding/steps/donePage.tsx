import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../../common/component/styled/Button";
import PlayIcon from "../../../assets/icons/play.svg?url";
import { Trans, useTranslation } from "react-i18next";

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
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 48px;
  }

  > .tip {
    width: 588px;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 48px;

    > .strong {
      font-weight: 700;
    }
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

export default function DonePage({ serverName }: { serverName: string }) {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <span className="primaryText">{t("done_welcome", { serverName })}</span>
      <span className="secondaryText">{t("done_title")}</span>
      <span className="tip">
        <Trans i18nKey={"onboarding.done_desc"} ns={"welcome"}>
          <span className="strong" />
        </Trans>
      </span>
      <StyledButton className="startButton" onClick={() => navigate("/")}>
        <img src={PlayIcon} alt="play icon" />
        <span>{t("enter")}</span>
      </StyledButton>
    </StyledWrapper>
  );
}
