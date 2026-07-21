import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import {
  useLazyGetAdminBotDmHistoryQuery,
  useLazyGetAdminBotGroupHistoryQuery,
} from "@/app/services/adminBotChat";
import { addMessage, removeMessage, updateMessage } from "@/app/slices/message";
import Message from "@/components/Message";
import { ChatMessage } from "@/types/message";

type Props = {
  botUid: number;
  target: { uid: number } | { gid: number };
};

const PAGE_LIMIT = 50;

const AdminMessageThread: FC<Props> = ({ botUid, target }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isUser = "uid" in target;
  const contextId = isUser ? target.uid : target.gid;
  const context = isUser ? "dm" : "channel";

  const [fetchDmHistory] = useLazyGetAdminBotDmHistoryQuery();
  const [fetchGroupHistory] = useLazyGetAdminBotGroupHistoryQuery();

  const [mids, setMids] = useState<number[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const oldestMidRef = useRef<number | undefined>(undefined);

  const processMessages = (messages: ChatMessage[]) => {
    const newMids: number[] = [];
    messages.forEach((msg) => {
      const { mid, from_uid, created_at, detail } = msg;
      switch (detail.type) {
        case "normal": {
          dispatch(
            addMessage({
              mid,
              from_uid,
              created_at,
              content_type: detail.content_type,
              content: detail.content,
              properties: detail.properties as any,
              expires_in: detail.expires_in,
            })
          );
          newMids.push(mid);
          break;
        }
        case "reply": {
          dispatch(
            addMessage({
              mid,
              from_uid,
              created_at,
              content_type: detail.content_type,
              content: detail.content,
              properties: detail.properties as any,
              reply_mid: detail.mid,
            })
          );
          newMids.push(mid);
          break;
        }
        case "reaction": {
          const { detail: inner, mid: targetMid } = detail;
          if (inner.type === "edit") {
            dispatch(
              updateMessage({
                mid: targetMid,
                content: inner.content,
                content_type: inner.content_type,
                properties: inner.properties as any,
                edited: true,
              })
            );
          } else if (inner.type === "delete") {
            dispatch(removeMessage(targetMid));
          }
          break;
        }
        default:
          break;
      }
    });
    return newMids;
  };

  const loadPage = async (before?: number) => {
    setLoading(true);
    try {
      const result = isUser
        ? await fetchDmHistory({ botUid, uid: contextId!, before, limit: PAGE_LIMIT }).unwrap()
        : await fetchGroupHistory({ botUid, gid: contextId!, before, limit: PAGE_LIMIT }).unwrap();

      if (result.length < PAGE_LIMIT) {
        setHasMore(false);
      }
      if (result.length > 0) {
        oldestMidRef.current = result[0].mid;
        const newMids = processMessages(result);
        setMids((prev) => {
          const merged = [...newMids.filter((m) => !prev.includes(m)), ...prev];
          return merged;
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMids([]);
    setHasMore(true);
    oldestMidRef.current = undefined;
    loadPage(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botUid, context, contextId]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadPage(oldestMidRef.current);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-4 py-2 text-xs text-center text-amber-700 bg-amber-50 dark:bg-amber-900/40 dark:text-amber-200 border-b border-amber-200 dark:border-amber-800">
        {t("bot_chat.read_only_admin_view")}
      </div>
      <div className="flex-1 overflow-y-auto px-1 md:px-4 py-2">
        {hasMore && (
          <div className="flex justify-center py-2">
            <button
              className="text-xs text-primary-500 hover:underline disabled:opacity-50"
              disabled={loading}
              onClick={handleLoadMore}
            >
              {t("bot_chat.load_more")}
            </button>
          </div>
        )}
        {mids.map((mid) => (
          <Message key={mid} readOnly mid={mid} context={context} contextId={contextId!} />
        ))}
      </div>
    </div>
  );
};

export default AdminMessageThread;
