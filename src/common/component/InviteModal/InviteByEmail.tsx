import { useEffect, useState, ChangeEvent, FC } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useInviteLink from "../../hook/useInviteLink";
import Button from "../styled/Button";
import Input from "../styled/Input";

const Styled = styled.div`
  padding: 16px 0;
  .input {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    > .copy {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      padding-right: 8px;
      background: none;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #22ccee;
      &:hover {
        color: #088ab2;
      }
    }
    input {
      padding-right: 80px;
      &.invite {
        padding-right: 50px;
      }
    }
  }
  > .invite {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
  }
  > .link {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }
  label {
    color: #6b7280;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  > .tip {
    color: #344054;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    button {
      margin-left: 4px;
      background: none;
      border: none;
      color: #22ccee;
    }
  }
`;

interface Props {
  cid?: number;
}

const InviteByEmail: FC<Props> = ({ cid }) => {
  const { t } = useTranslation("chat");
  const [email, setEmail] = useState("");
  const { enableSMTP, linkCopied, link, copyLink, generateNewLink, generating } =
    useInviteLink(cid);
  useEffect(() => {
    if (linkCopied) {
      toast.success("Invite Link Copied!");
    }
  }, [linkCopied]);

  const handleEmail = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  return (
    <Styled>
      <div className="invite">
        <label htmlFor="">{t("invite_by_email")}</label>
        <div className="input">
          <Input
            value={email}
            onChange={handleEmail}
            disabled={!enableSMTP}
            type="email"
            placeholder={enableSMTP ? "Enter Email" : t("enable_smtp") || ""}
          />
          <Button disabled={!enableSMTP || !email} className="send">
            {t("action.send", { ns: "common" })}
          </Button>
        </div>
      </div>
      <div className="link">
        <label htmlFor="">{t("send_invite_link")}</label>
        <div className="input">
          <Input readOnly className="invite" placeholder="Generating" value={link} />
          <button className="copy" onClick={copyLink}>
            {t("action.copy", { ns: "common" })}
          </button>
        </div>
      </div>
      <div className="tip">
        {t("invite_link_expire")}
        <button disabled={generating} className="new" onClick={() => generateNewLink()}>
          {t("generate_new_link")}
        </button>
      </div>
    </Styled>
  );
};

export default InviteByEmail;
