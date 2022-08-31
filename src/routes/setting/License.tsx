import { ChangeEvent, useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import toast from "react-hot-toast";
import { hideAll } from "tippy.js";
import Textarea from "../../common/component/styled/Textarea";
import Button from "../../common/component/styled/Button";
import useLicense from "../../common/hook/useLicense";

const StyledConfirm = styled.div`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid orange;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
  .tip {
    color: orange;
    font-size: 12px;
    line-height: 1.5;
  }
  .btns {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 14px;
  }
`;
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
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  > .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export default function License() {
  const { license: licenseInfo, checking, upserting, upsertLicense } = useLicense();
  const [license, setLicense] = useState("");
  const handleUpsert = async () => {
    if (!license) {
      toast.error("License Empty");
      hideAll();
      return;
    }
    const success = await upsertLicense(license);
    if (!success) {
      toast.error("Invalid License");
      hideAll();
    } else {
      toast.success("License Updated!");
    }
  };
  const handleLicenseInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setLicense(evt.target.value);
  };
  useEffect(() => {
    if (licenseInfo?.base58) {
      setLicense(licenseInfo.base58);
    }
  }, [licenseInfo]);

  const disableBtn = checking || upserting || !license || license === licenseInfo?.base58;
  return (
    <Styled>
      <div className="input">
        <Tippy
          placement="right-start"
          visible={!!licenseInfo}
          content={
            <StyledInfo>
              <div className="item">
                <span className="label">Signed</span>
                <span className="info">{licenseInfo?.sign ? "Yes" : "Not Yet"}</span>
              </div>
              <div className="item">
                <span className="label">Domains</span>
                <ul className="info">
                  {" "}
                  {licenseInfo?.domains.map((d) => {
                    return <li key={d}>{d}</li>;
                  })}
                </ul>
              </div>
              <div className="item">
                <span className="label">User Limit</span>
                <span className="info"> {licenseInfo?.user_limit}</span>
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
          }
        >
          <Textarea rows={15} id="license" value={license} onChange={handleLicenseInput} />
        </Tippy>
      </div>
      <Tippy
        interactive
        placement="bottom-start"
        trigger="click"
        content={
          <StyledConfirm>
            <div className="tip">Are you sure to update License?</div>
            <div className="btns">
              <Button onClick={() => hideAll()} className="cancel small">
                Cancel
              </Button>
              <Button disabled={disableBtn} className="small danger" onClick={handleUpsert}>
                Yes
              </Button>
            </div>
          </StyledConfirm>
        }
      >
        <Button disabled={disableBtn}>Update License</Button>
      </Tippy>
    </Styled>
  );
}
