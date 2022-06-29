import { useState, useEffect } from "react";
import { normalizeArchiveData, ArchiveMessage } from "../utils";
import { useLazyGetArchiveMessageQuery } from "../../app/services/message";

export default function useNormalizeMessage() {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [normalizedMessages, setNormalizedMessages] = useState<ArchiveMessage[] | null>(null);
  const [getArchiveMessage, { data, isError, isLoading, isSuccess }] =
    useLazyGetArchiveMessageQuery();
  useEffect(() => {
    if (data && isSuccess) {
      const msgs = normalizeArchiveData(data, filePath);
      setNormalizedMessages(msgs);
    }
  }, [data, isSuccess, filePath]);
  useEffect(() => {
    if (filePath) {
      getArchiveMessage(filePath);
    }
  }, [filePath]);

  const normalizeMessage = (file_path: string) => {
    setFilePath(file_path);
  };
  return {
    normalizeMessage,
    messages: normalizedMessages,
    isError,
    isLoading,
    isSuccess
  };
}
