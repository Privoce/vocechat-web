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
  const { copied, copy } = useCopy({ enableToast: false });
  const copyLink = () => {
    copy(finalLink);
  };
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
  const genServerLink = () => {
    generateServerInviteLink();
  };
  return {
    enableSMTP: SMTPEnabled,
    generating: cid ? generatingChannelLink : generatingServerLink,
    generateNewLink: cid
      ? generateChannelInviteLink.bind(null, cid)
      : genServerLink,
    link: finalLink,
    linkCopied: copied,
    copyLink,
  };
}
