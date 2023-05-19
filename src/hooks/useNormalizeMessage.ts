import { useEffect, useState } from "react";

import { useLazyGetArchiveMessageQuery } from "@/app/services/message";
import { useAppSelector } from "@/app/store";
import { ArchiveMessage } from "@/types/resource";
import { normalizeArchiveData } from "../utils";

export default function useNormalizeMessage(filePath: string | null) {
  const archiveData = useAppSelector((store) => store.archiveMessage[filePath ?? ""]);
  const [normalizedMessages, setNormalizedMessages] = useState<ArchiveMessage[] | null>(null);
  const [getArchiveMessage, { isError, isLoading, isSuccess }] = useLazyGetArchiveMessageQuery();
  useEffect(() => {
    if (archiveData) {
      const msgs = normalizeArchiveData(archiveData, filePath);
      setNormalizedMessages(msgs);
    } else if (filePath) {
      getArchiveMessage(filePath);
    }
  }, [archiveData, filePath]);

  return {
    messages: normalizedMessages,
    isError,
    isLoading,
    isSuccess
  };
}
