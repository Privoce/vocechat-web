import { useState, useEffect } from "react";
import useCopy from "./useCopy";
import {
  useLazyCreateInviteLinkQuery as useCreateServerInviteLinkQuery,
  useGetSMTPConfigQuery,
} from "../../app/services/server";
import { useLazyCreateInviteLinkQuery as useCreateChannelInviteLinkQuery } from "../../app/services/channel";
export default function useInviteLink(cid = null) {
  const [finalLink, setFinalLink] = useState("");
  const {
    data: config,
    isSuccess: configQuerySuccess,
  } = useGetSMTPConfigQuery();
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
    if (_link && config) {
      const tmpURL = new URL(_link);
      tmpURL.searchParams.set("code", config.enabled);
      setFinalLink(tmpURL.href);
    }
  }, [serverInviteLink, channelInviteLink, config]);
  return {
    enableSMTP: config?.enabled,
    generating: generatingChannelLink || generatingServerLink,
    generateNewLink: regenLink,
    link: finalLink,
    linkCopied,
    copyLink,
  };
}
