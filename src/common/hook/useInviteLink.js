import { useState, useEffect } from "react";
import useCopy from "./useCopy";
import {
  useCreateInviteLinkQuery,
  useGetSMTPConfigQuery,
} from "../../app/services/server";
export default function useInviteLink() {
  const [finalLink, setFinalLink] = useState("");
  const {
    data: config,

    isSuccess: configQuerySuccess,
  } = useGetSMTPConfigQuery();
  const { data: link, isLoading, refetch } = useCreateInviteLinkQuery();
  const [linkCopied, copy] = useCopy();
  const copyLink = () => {
    copy(finalLink);
  };
  useEffect(() => {
    if (link && config) {
      const tmpURL = new URL(link);
      tmpURL.searchParams.set("code", config.enabled);
      setFinalLink(tmpURL.href);
    }
  }, [link, config]);

  return {
    enableSMTP: config?.enabled,
    generating: isLoading,
    generateNewLink: refetch,
    link: finalLink,
    linkCopied,
    copyLink,
  };
}
