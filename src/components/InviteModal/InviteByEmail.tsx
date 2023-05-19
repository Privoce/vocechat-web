import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useSendLoginMagicLinkMutation } from "@/app/services/auth";
import useInviteLink from "@/hooks/useInviteLink";
import QRCode from "../QRCode";
import Button from "../styled/Button";
import Input from "../styled/Input";

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
    <div className="pt-4">
      <div className="flex flex-col gap-4 mb-6">
        <label className="text-sm text-gray-400 dark:text-gray-100" htmlFor="">
          {t("invite_by_email")}
        </label>
        <div className="relative flex items-center gap-2">
          <form ref={formRef} action="/" className="w-full">
            <Input
              className="!pr-20"
              required
              value={email}
              onChange={handleEmail}
              disabled={!enableSMTP}
              type="email"
              name="email"
              placeholder={enableSMTP ? "Enter Email" : t("enable_smtp")}
            />
          </form>
          <Button
            disabled={!enableSMTP || !email || isLoading}
            className="send"
            onClick={handleSendEmail}
          >
            {ct("action.send")}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-sm text-gray-400 dark:text-gray-100" htmlFor="">
          {t("send_invite_link")}
        </label>
        <div className="relative flex items-center gap-2">
          <Input readOnly className="!pr-[50px]" placeholder="Generating" value={link} />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 pr-2 text-sm text-primary-400 hover:text-primary-600"
            onClick={copyLink}
          >
            {ct("action.copy")}
          </button>
        </div>
      </div>
      <div className="w-44 h-44 my-2">{!generating && <QRCode size={1200} link={link} />}</div>
      <div className="text-xs text-gray-600 dark:text-gray-200">
        {t("invite_link_expire")}
        <button
          disabled={generating}
          className="text-primary-400 ml-1"
          onClick={() => generateNewLink()}
        >
          {t("generate_new_link")}
        </button>
      </div>
    </div>
  );
};

export default InviteByEmail;
