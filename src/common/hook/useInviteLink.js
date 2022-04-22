import { useState, useEffect } from "react";
import useCopy from "./useCopy";
import {
  useLazyCreateInviteLinkQuery as useCreateServerInviteLinkQuery,
  useGetSMTPStatusQuery,
} from "../../app/services/server";
import { useLazyCreateInviteLinkQuery as useCreateChannelInviteLinkQuery } from "../../app/services/channel";
export default function useInviteLink(cid = null) {
  const [finalLink, setFinalLink] = useState("");
  const {
    data: SMTPEnabled,
    isSuccess: smtpStatusFetchSuccess,
  } = useGetSMTPStatusQuery();
  const [
    generateChannelInviteLink,
    { data: channelInviteLink, isLoading: generatingChannelLink },
  ] = useCreateChannelInviteLinkQuery();
  const [
    generateServerInviteLink,
    { data: serverInviteLink, isLoading: generatingServerLink },
  ] = useCreateServerInviteLinkQuery();
  const [linkCopied, copy] = useCopy();
  const copyLink = () => {
    copy(finalLink);
  };
  const regenLink = cid
    ? () => {
        generateChannelInviteLink(cid);
      }
    : generateServerInviteLink;
  useEffect(() => {
    if (cid) {
      generateChannelInviteLink(cid);
    } else {
      generateServerInviteLink();
    }
  }, [cid]);

  useEffect(() => {
    const _link = serverInviteLink || channelInviteLink;
    console.log("fetching", serverInviteLink, channelInviteLink);
    if (_link && smtpStatusFetchSuccess) {
      const tmpURL = new URL(_link);
      tmpURL.searchParams.set("code", SMTPEnabled);
      setFinalLink(tmpURL.href);
    }
  }, [serverInviteLink, channelInviteLink, smtpStatusFetchSuccess]);
  return {
    enableSMTP: SMTPEnabled,
    generating: cid ? generatingChannelLink : generatingServerLink,
    generateNewLink: regenLink,
    link: finalLink,
    linkCopied,
    copyLink,
  };
}
