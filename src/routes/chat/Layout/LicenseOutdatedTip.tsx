// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../common/component/styled/Button";
const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ef4444;
  border-radius: var(--br);
  width: 100%;
  width: -webkit-fill-available;
  padding: 12px 16px;
  .txt {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #fff;
    .hand {
      font-size: 20px;
      margin-right: 10px;
    }
  }
`;
// type Props = {};

const LicenseUpgradeTip = () => {
  const { t } = useTranslation("chat");
  const navigateTo = useNavigate();
  const handleRedirect = () => {
    navigateTo("/setting?nav=license");
  };

  return (
    <Styled>
      <span className="txt">
        <i className="hand">🚨</i>
        {t("license_tip")}
      </span>
      <Button onClick={handleRedirect} className="small">{`Upgrade License`}</Button>
    </Styled>
  );
};

export default LicenseUpgradeTip;
