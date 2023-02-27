import { FC } from "react";
import { useTranslation } from "react-i18next";
import useInviteLink from "../hook/useInviteLink";
import Input from "./styled/Input";
import Button from "./styled/Button";
import QRCode from "./QRCode";
import IconQuestion from '../../assets/icons/question.svg';

type Props = {};
const InviteLink: FC<Props> = () => {
  const { t } = useTranslation("chat");
  const { generating, link, linkCopied, copyLink, generateNewLink } = useInviteLink();
  const handleNewLink = () => {
    generateNewLink();
  };

  return (
    <div className="flex flex-col items-start pb-8">
      <p className="font-semibold text-sm mb-2 text-gray-500 dark:text-gray-50 flex gap-4">
        {t("share_invite_link")}
        <a className="text-primary-500 flex gap-1 items-center" href="http://doc.voce.chat/faq#fe_url" target="_blank" rel="noopener noreferrer">
          <IconQuestion /> {t("invite_link_faq")}
        </a>
      </p>
      <div className="w-full md:w-[512px] mb-3 relative">
        <Input readOnly className={"large !pr-16"} placeholder="Generating" value={link} />
        <Button onClick={copyLink} className="ghost small border_less absolute right-1 top-1/2 -translate-y-1/2">
          {linkCopied ? "Copied" : t("action.copy", { ns: "common" })}
        </Button>
      </div>
      <span className="text-xs text-gray-600 dark:text-gray-100">{t("invite_link_expire")}</span>
      <div className="w-44 h-44 my-2">
        <QRCode size={1200} link={link} />
      </div>
      <Button className="ghost" disabled={generating} onClick={handleNewLink}>
        {generating ? `Generating` : t("generate_new_link")}
      </Button>
    </div>
  );
};

export default InviteLink;
