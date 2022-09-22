import { useState, MouseEvent } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
// import Tippy from "@tippyjs/react";
// import toast from "react-hot-toast";
// import { hideAll } from "tippy.js";
// import Textarea from "../../common/component/styled/Textarea";
import Button from "../../common/component/styled/Button";
import useLicense from "../../common/hook/useLicense";
import LicensePriceListModal from "./LicensePriceListModal";

const Styled = styled.div`
  max-width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  > .license {
    position: relative;
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 2px solid #557d2340;
    background-color: #d1fadf60;
    display: flex;
    flex-direction: column;
    gap: 15px;
    &.outdated {
      border-color: #ef4444;
      background-color: #ef444457;
      &:after {
        content: "License Outdated";
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: #ef4444;
        padding: 5px 4px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        border-radius: 4px;
      }
    }
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
        line-height: 1.4;
        &.value {
          cursor: pointer;
          width: 100%;
          white-space: pre-wrap;
          word-break: break-all;
          &.fold {
            white-space: inherit;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
`;

export default function License() {
  const { license: licenseInfo, reachLimit } = useLicense();
  const [modalVisible, setModalVisible] = useState(false);
  const handleRenewLicense = () => {
    toggleModalVisible();
  };
  const toggleModalVisible = () => {
    setModalVisible((prev) => !prev);
  };
  const handleLicenseValueToggle = (evt: MouseEvent<HTMLSpanElement>) => {
    const ele = evt.currentTarget;
    ele.classList.toggle("fold");
    if (ele.classList.contains("fold")) {
      ele.title = "Click to see full text";
    } else {
      ele.title = "Click to fold text";
    }
  };
  // const disableBtn = !reachLimit;
  return (
    <>
      <Styled>
        <div className={`license ${reachLimit ? "outdated" : ""}`}>
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
          <div className="item">
            <span className="label">License Value</span>
            <span
              className="info value fold"
              title="Click to see full text"
              onClick={handleLicenseValueToggle}
            >
              {licenseInfo?.base58}
            </span>
          </div>
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
