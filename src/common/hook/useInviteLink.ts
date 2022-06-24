import { useState, useEffect } from "react";
import useCopy from "./useCopy";
import { useGetSMTPStatusQuery } from "../../app/services/server";
import { useLazyCreateInviteLinkQuery as useCreateChannelInviteLinkQuery } from "../../app/services/channel";

export default function useInviteLink(cid: string | null = "") {
  const [finalLink, setFinalLink] = useState("");
  const { data: SMTPEnabled, isSuccess: smtpStatusFetchSuccess } = useGetSMTPStatusQuery();
  const [generateChannelInviteLink, { data: channelInviteLink, isLoading: generatingChannelLink }] =
    useCreateChannelInviteLinkQuery();

  const { copied, copy } = useCopy({ enableToast: false });
  const copyLink = () => {
    copy(finalLink);
  };
  useEffect(() => {
    generateChannelInviteLink(cid);
  }, [cid]);

  useEffect(() => {
    const _link = channelInviteLink;
    console.log("fetching", channelInviteLink);
    if (_link && smtpStatusFetchSuccess) {
      // const tmpURL = new URL(_link);
      // tmpURL.searchParams.set("code", SMTPEnabled);
      setFinalLink(_link);
    }
  }, [channelInviteLink, smtpStatusFetchSuccess]);
  const genServerLink = () => {
    generateChannelInviteLink();
  };
  return {
    enableSMTP: SMTPEnabled,
    generating: generatingChannelLink,
    generateNewLink: cid ? generateChannelInviteLink.bind(null, cid) : genServerLink,
    link: finalLink,
    linkCopied: copied,
    copyLink
  };
}
