// import { MouseEvent, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import Linkify from "linkify-react";

import "linkify-plugin-mention";
import Mention from "./Message/Mention";
import URLPreview from "./Message/URLPreview";
import useServerExtSetting from "@/hooks/useServerExtSetting";
import { KEY_MSG_URL_PREVIEW } from "@/app/config";

type Props = {
  url?: boolean;
  linkPreview?: boolean;
  mention?: boolean;
  mentionTextOnly?: boolean;
  mentionPopOver?: boolean;
  text: string;
  cid?: number;
};

const LinkifyText = ({
  url = true,
  mention = true,
  mentionTextOnly = false,
  mentionPopOver = true,
  linkPreview = true,
  text,
  cid
}: Props) => {
  const { getExtSetting } = useServerExtSetting({ successTip: false, key: KEY_MSG_URL_PREVIEW });
  const enablePreview = getExtSetting() && linkPreview;
  return (
    <Linkify
      options={{
        render: {
          email: ({ content, attributes: { href: link } }) => {
            if (mentionTextOnly) return <>{content}</>;
            return (
              <a className="text-primary-500" href={link} rel="noreferrer">
                {content}
              </a>
            );
          },
          url: ({ content, attributes: { href: link } }) => {
            // 只识别 http 开头的
            if (!url || !content.startsWith("http")) return <>{content}</>;
            return (
              <>
                <a className="text-primary-500" target="_blank" href={link} rel="noreferrer">
                  {content}
                </a>
                {enablePreview && <URLPreview url={link} />}
              </>
            );
          },
          mention: ({ content }) => {
            if (!mention) return <>{content}</>;
            // console.log();
            if (/@[0-9]+/.test(content)) {
              const uid = content.trim().slice(1);
              return (
                <Mention uid={+uid} cid={cid} popover={mentionPopOver} textOnly={mentionTextOnly} />
              );
            }
            return <>{content}</>;
          }
        }
      }}
    >
      {text}
    </Linkify>
  );
};

export default LinkifyText;
