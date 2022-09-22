import { useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
// import Tippy from "@tippyjs/react";
// import toast from "react-hot-toast";
// import { hideAll } from "tippy.js";
import Textarea from "../../common/component/styled/Textarea";
import Button from "../../common/component/styled/Button";
import useLicense from "../../common/hook/useLicense";
import LicensePriceListModal from "./LicensePriceListModal";

const StyledInfo = styled.div`
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #557d2340;
  background-color: #d1fadf60;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .item {
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.2;
    .label {
      font-size: 13px;
      color: #aaa;
      &:after {
        content: ":";
      }
    }
    .info {
      font-weight: bold;
      font-size: 18px;
    }
  }
`;
const Styled = styled.div`
  max-width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  > .license {
    width: 100%;
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
    gap: 15px;
  }
`;

export default function License() {
  const { license: licenseInfo } = useLicense();
  const [modalVisible, setModalVisible] = useState(false);
  const handleRenewLicense = () => {
    toggleModalVisible();
  };
  const toggleModalVisible = () => {
    setModalVisible((prev) => !prev);
  };

  // const disableBtn = !reachLimit;
  return (
    <>
      <Styled>
        <div className="license">
          <Textarea disabled rows={14} id="license" value={licenseInfo?.base58} />
          <StyledInfo>
            <div className="item">
              <span className="label">Signed</span>
              <span className="info">{licenseInfo?.sign ? "Yes" : "Not Yet"}</span>
            </div>
            <div className="item">
              <span className="label">Domains</span>
              <ul className="info">
                {licenseInfo?.domains.map((d) => {
                  return <li key={d}>{d}</li>;
                })}
              </ul>
            </div>
            <div className="item">
              <span className="label">User Limit</span>
              <span className="info">
                {licenseInfo?.user_limit == 99999 ? "No Limit" : licenseInfo?.user_limit}
              </span>
            </div>
            <div className="item">
              <span className="label">Expired At</span>
              <span className="info">
                {dayjs(licenseInfo?.expired_at).format("YYYY-MM-DD h:mm:ss A")}
              </span>
            </div>
            <div className="item">
              <span className="label">Created At</span>
              <span className="info">
                {dayjs(licenseInfo?.created_at).format("YYYY-MM-DD h:mm:ss A")}
              </span>
            </div>
          </StyledInfo>
        </div>
        <Button onClick={handleRenewLicense}>Renew License</Button>
      </Styled>
      {modalVisible && (
        <LicensePriceListModal
          closeModal={toggleModalVisible}
          // domain={licenseInfo?.domains ? licenseInfo.domains.join("|") : ""}
        />
      )}
    </>
  );
}
