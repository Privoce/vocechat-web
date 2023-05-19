import { useEffect, useState } from "react";

import {
  useLazyCreateInviteLinkQuery as useCreateChannelInviteLinkQuery,
  useLazyCreatePrivateInviteLinkQuery
} from "@/app/services/channel";
import { useGetSMTPStatusQuery } from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import useCopy from "./useCopy";

export default function useInviteLink(cid?: number) {
  const [finalLink, setFinalLink] = useState("");
  const channel = useAppSelector((store) => store.channels.byId[cid ?? 0]);
  const { data: SMTPEnabled, isSuccess: smtpStatusFetchSuccess } = useGetSMTPStatusQuery();
  const [generateChannelInviteLink, { data: channelInviteLink, isLoading: generatingChannelLink }] =
    useCreateChannelInviteLinkQuery();
  const [generatePrivateInviteLink, { data: privateInviteLink, isLoading: generatingPrivateLink }] =
    useLazyCreatePrivateInviteLinkQuery();

  const { copied, copy } = useCopy({ enableToast: false });
  const copyLink = () => {
    copy(finalLink);
  };
  useEffect(() => {
    if (!cid || channel?.is_public) {
      generateChannelInviteLink(cid);
    } else {
      generatePrivateInviteLink(cid);
    }
  }, [cid, channel]);

  useEffect(() => {
    const _link = channelInviteLink || privateInviteLink;
    if (_link && smtpStatusFetchSuccess) {
      setFinalLink(_link);
    }
  }, [channelInviteLink, privateInviteLink, smtpStatusFetchSuccess]);
  const genServerLink = () => {
    generateChannelInviteLink();
  };
  const generating = generatingPrivateLink || generatingChannelLink;
  return {
    enableSMTP: SMTPEnabled,
    generating,
    generateNewLink: cid ? generateChannelInviteLink.bind(null, cid) : genServerLink,
    link: finalLink,
    linkCopied: copied,
    copyLink
  };
}
