import { useEffect, useState } from "react";

import { getInviteLinkExpireList, getInviteLinkTimesList } from "@/app/config";
import {
  useLazyCreateInviteLinkQuery,
  useLazyCreatePrivateInviteLinkQuery
} from "@/app/services/channel";
import { useGetSMTPStatusQuery } from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import useCopy from "./useCopy";
import { shallowEqual } from "react-redux";

const defaultExpire = getInviteLinkExpireList()[4].value;
const defaultTimes = getInviteLinkTimesList()[0].value;
type ParamsProps = { expire: number; times: number };
const defaultParams: ParamsProps = { expire: defaultExpire, times: defaultTimes };
export default function useInviteLink(cid?: number) {
  const [finalLink, setFinalLink] = useState("");
  const channel = useAppSelector((store) => store.channels.byId[cid ?? 0], shallowEqual);
  const { data: SMTPEnabled, isSuccess: smtpStatusFetchSuccess } = useGetSMTPStatusQuery();
  const [generateInviteLink, { data: channelInviteLink, isLoading: generatingChannelLink }] =
    useLazyCreateInviteLinkQuery();
  const [generatePrivateInviteLink, { data: privateInviteLink, isLoading: generatingPrivateLink }] =
    useLazyCreatePrivateInviteLinkQuery();

  const { copied, copy } = useCopy({ enableToast: false });
  const copyLink = () => {
    copy(finalLink);
  };
  useEffect(() => {
    if (!cid || channel?.is_public) {
      generateInviteLink({ expire: defaultExpire, times: defaultTimes });
    } else {
      generatePrivateInviteLink({ cid, expire: defaultExpire, times: defaultTimes });
    }
  }, [cid, channel]);

  useEffect(() => {
    const _link = channelInviteLink || privateInviteLink;
    if (_link && smtpStatusFetchSuccess) {
      setFinalLink(_link);
    }
  }, [channelInviteLink, privateInviteLink, smtpStatusFetchSuccess]);
  const generateNewLink = (params = defaultParams) => {
    const { expire, times } = params;
    if (!cid || channel?.is_public) {
      generateInviteLink({ expire, times });
    } else {
      generatePrivateInviteLink({ cid, expire, times });
    }
  };
  const generating = generatingPrivateLink || generatingChannelLink;
  return {
    enableSMTP: SMTPEnabled,
    generating,
    generateNewLink,
    link: finalLink,
    linkCopied: copied,
    copyLink
  };
}
