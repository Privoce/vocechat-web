import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import StyledButton from "@/components/styled/Button";
import useCopy from "@/hooks/useCopy";
import useDownload from "@/hooks/useDownload";
import { isMobile } from "@/utils";

// type Props = {};

const InviteInMobile = () => {
  const { magic_token } = useParams();
  const { t } = useTranslation("auth", { keyPrefix: "invite_mobile" });
  const download = useDownload();
  const [inviteLink, setInviteLink] = useState("");
  const { copy, copied } = useCopy();
  useEffect(() => {
    if (!isMobile() && inviteLink) {
      location.href = inviteLink;
    }
  }, [inviteLink]);
  useEffect(() => {
    if (magic_token) {
      setInviteLink(`${location.origin}/#/register?magic_token=${magic_token}`);
    }
  }, [magic_token]);
  const app_link = `vocechat://i?magic_link=${encodeURIComponent(inviteLink)}`;
  const webLink = `${inviteLink}&ctx=web`;
  if (!inviteLink) return null;
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <div className="relative">
        <img
          src="https://voce.chat/img/app.grid.png"
          className="object-cover max-w-[unset]"
          alt="APP grid"
        />
        <span className="absolute left-1/2 bottom-8 -translate-x-1/2 bg-transparent font-bold text-lg ">
          {t("join")}!
        </span>
      </div>

      <p className="text-md text-gray-600 my-5">
        {t("have_already")}
        <a href={app_link} className="text-primary-500 px-2">
          {t("open")}
        </a>
      </p>
      <div className="flex flex-col items-center mb-12">
        {webLink && (
          <a href={webLink} className="p-2 mt-2 rounded bg-primary-500 text-white">
            Continue with webapp
          </a>
        )}
        <div className="text-gray-600 w-[80%] flex flex-col items-center gap-2 my-4">
          <i className="text-gray-400 not-italic text-xs break-words text-center">
            👇App not showing? You may copy the following invitation link and paste it into VoceChat
            App.
          </i>
          <div
            className="text-left bg-gray-200 font-bold p-2 rounded-md break-all overflow-y-scroll resize-none"
            spellCheck={false}
          >
            {inviteLink}
          </div>
          <StyledButton onClick={copy.bind(null, inviteLink, false)} className="small w-fit">
            {copied ? "Copied" : `Copy`}
          </StyledButton>
        </div>
        {download ? (
          Array.isArray(download) ? (
            <ul className="my-10">
              {" "}
              {download.map((d) => {
                const { link, icon } = d;
                return (
                  <li key={link}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <img
                        alt="App Download Icon"
                        src={icon}
                        className="max-w-[80%] h-auto m-auto mb-2"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <a href={download.link} target="_blank" rel="noopener noreferrer" className="my-10">
              <img
                alt="App Download Icon"
                src={download.icon}
                className="max-w-[80%] h-auto m-auto"
              />
            </a>
          )
        ) : null}
      </div>
    </main>
  );
};

export default InviteInMobile;
