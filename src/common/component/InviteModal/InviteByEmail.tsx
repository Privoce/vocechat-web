import { useEffect, useState, ChangeEvent, FC, useRef } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSendLoginMagicLinkMutation } from "../../../app/services/auth";
import useInviteLink from "../../hook/useInviteLink";
import QRCode from "../QRCode";
import Button from "../styled/Button";
import Input from "../styled/Input";

const Styled = styled.div`
  padding: 16px 0;
  padding-bottom: 0;
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
  const { t: ct } = useTranslation();
  const [email, setEmail] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sendMagicLinkByEmail, { isSuccess, isLoading }] = useSendLoginMagicLinkMutation();
  const { enableSMTP, linkCopied, link, copyLink, generateNewLink, generating } =
    useInviteLink(cid);
  useEffect(() => {
    if (linkCopied) {
      toast.success("Invite Link Copied!");
    }
  }, [linkCopied]);
  useEffect(() => {
    if (isSuccess) {

      toast.success("Email Sent!");
    }
  }, [isSuccess]);

  const handleEmail = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };
  const handleSendEmail = () => {
    if (formRef && formRef.current) {
      const formEle = formRef.current;
      if (!formEle.checkValidity()) {
        formEle.reportValidity();
      } else {
        sendMagicLinkByEmail(email);
      }
    }
  };

  return (
    <Styled>
      <div className="invite">
        <label htmlFor="">{t("invite_by_email")}</label>
        <div className="input">
          <form ref={formRef} action="/" className="w-full">
            <Input
              required
              value={email}
              onChange={handleEmail}
              disabled={!enableSMTP}
              type="email"
              name="email"
              placeholder={enableSMTP ? "Enter Email" : t("enable_smtp")}
            />
          </form>
          <Button disabled={!enableSMTP || !email || isLoading} className="send" onClick={handleSendEmail}>
            {ct("action.send")}
          </Button>
        </div>
      </div>
      <div className="link">
        <label htmlFor="">{t("send_invite_link")}</label>
        <div className="input">
          <Input readOnly className="invite" placeholder="Generating" value={link} />
          <button className="copy" onClick={copyLink}>
            {ct("action.copy")}
          </button>
        </div>
      </div>
      <div className="w-44 h-44 my-2">
        {!generating && <QRCode link={link} />}
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
