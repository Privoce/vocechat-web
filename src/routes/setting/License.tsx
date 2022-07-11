import { ChangeEvent, useState } from "react";
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
  const { checking, upserting, upsertLicense } = useLicense();
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

  const disableBtn = checking || upserting || !license;
  return (
    <Styled>
      <div className="input">
        <Textarea rows={10} id="license" value={license} onChange={handleLicenseInput} />
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
        <Button disabled={disableBtn}>Save License</Button>
      </Tippy>
    </Styled>
  );
}
