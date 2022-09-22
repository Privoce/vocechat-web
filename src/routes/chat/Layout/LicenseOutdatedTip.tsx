// import { useEffect } from "react";
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
  const navigateTo = useNavigate();
  const handleRedirect = () => {
    navigateTo("/setting?nav=license");
  };

  return (
    <Styled>
      <span className="txt">
        <i className="hand">🚨</i>
        Your license has reached the limit, upgrade the License or contact the Admin!
      </span>
      <Button onClick={handleRedirect} className="small">{`Upgrade License`}</Button>
    </Styled>
  );
};

export default LicenseUpgradeTip;
