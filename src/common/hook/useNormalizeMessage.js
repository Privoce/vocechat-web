import { useState, useEffect } from "react";
import BASE_URL, { ContentTypes } from "../../app/config";
import { useLazyGetArchiveMessageQuery } from "../../app/services/message";
export default function useNormalizeMessage() {
  const [filePath, setFilePath] = useState(null);
  const [normalizedMessages, setNormalizedMessages] = useState(null);
  const [
    getArchiveMessage,
    { data, isError, isLoading, isSuccess },
  ] = useLazyGetArchiveMessageQuery();
  useEffect(() => {
    if (data && isSuccess) {
      const msgs = data.messages.map(
        ({
          content,
          file_id,
          thumbnail_id,
          content_type,
          properties,
          from_user,
        }) => {
          const transformedContent =
            content_type == ContentTypes.file
              ? `${BASE_URL}/resource/archive/attachment?file_path=${filePath}&attachment_id=${file_id}`
              : content;
          const thumbnail =
            content_type == ContentTypes.file
              ? `${BASE_URL}/resource/archive/attachment?file_path=${filePath}&attachment_id=${thumbnail_id}`
              : "";
          const download =
            content_type == ContentTypes.file
              ? `${BASE_URL}/resource/archive/attachment?file_path=${filePath}&attachment_id=${file_id}&download=true`
              : "";
          let user = { ...(data.users[from_user] || {}) };
          user.avatar =
            user.avatar !== null
              ? `${BASE_URL}/resource/archive/attachment?file_path=${filePath}&attachment_id=${user.avatar}`
              : "";

          console.log("user data", transformedContent, user);
          return {
            user,
            content: transformedContent,
            content_type,
            properties,
            download,
            thumbnail,
          };
        }
      );
      setNormalizedMessages(msgs);
    }
  }, [data, isSuccess, filePath]);
  useEffect(() => {
    if (filePath) {
      getArchiveMessage(filePath);
    }
  }, [filePath]);

  const normalizeMessage = (file_path) => {
    setFilePath(file_path);
  };
  return {
    normalizeMessage,
    messages: normalizedMessages,
    isError,
    isLoading,
    isSuccess,
  };
}
