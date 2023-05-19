// import { MouseEvent, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import Linkify from "linkify-react";

import "linkify-plugin-mention";
import Mention from "./Message/Mention";
import URLPreview from "./Message/URLPreview";

type Props = {
  url?: boolean;
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
  text,
  cid
}: Props) => {
  // const { t } = useTranslation();
  // const
  return (
    <Linkify
      options={{
        render: {
          email: ({ content, attributes: { href: link } }) => {
            if (mentionTextOnly) return <>{content}</>;
            return (
              <a className="link" href={link} rel="noreferrer">
                {content}
              </a>
            );
          },
          url: ({ content, attributes: { href: link } }) => {
            // console.log("attr", link);
            if (!url) return <>{content}</>;
            return (
              <>
                <a className="link" target="_blank" href={link} rel="noreferrer">
                  {content}
                </a>
                <URLPreview url={link} />
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
