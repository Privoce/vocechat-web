import Tippy from "@tippyjs/react";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";
import IconQuestion from "@/assets/icons/question.svg";
// import { useTranslation } from "react-i18next";
import { PropsWithChildren } from "react";
import { Trans } from 'react-i18next';

const Link = ({ to, children }: PropsWithChildren<{ to: string }>) => {

  return <a href={to} className="text-primary-500" target="_blank" rel="noreferrer" >
    {children}
  </a>;
};
export default function Tooltip({ link = "#" }) {
  return (
    <Tippy
      delay={[0, 500]}
      interactive
      arrow={roundArrow}
      placement="bottom"
      content={
        <div className="py-2 px-3 bg-gray-800 text-xs text-white rounded-lg">
          <Trans ns="setting" i18nKey={"login.more_details"}  >
            <Link to={link} />
          </Trans>
        </div>
      }
    >
      <IconQuestion className="icon" />
    </Tippy>
  );
}
