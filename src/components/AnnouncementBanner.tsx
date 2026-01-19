import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GroupAnnouncement } from "@/types/sse";
import IconClose from "@/assets/icons/close.svg";

interface Props {
  announcement: GroupAnnouncement;
  onExpand: () => void;
  onDismiss: () => void;
}

const AnnouncementBanner: FC<Props> = ({ announcement, onExpand, onDismiss }) => {
  const { t } = useTranslation("chat");
  const firstLine = announcement.content.split("\n")[0].trim();
  const truncatedContent = firstLine.length > 100 ? `${firstLine.slice(0, 100)}...` : firstLine;

  return (
    <div className="w-full bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-yellow-800 dark:text-yellow-200 font-semibold text-sm">
            📢 {t("announcement")}:
          </span>
          <button
            onClick={onExpand}
            className="flex-1 text-left text-yellow-700 dark:text-yellow-300 text-sm hover:underline truncate"
          >
            {truncatedContent}
          </button>
        </div>
        <button
          onClick={onDismiss}
          className="shrink-0 p-1 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded transition-colors"
          aria-label={t("dismiss_announcement")}
        >
          <IconClose className="w-4 h-4 text-yellow-700 dark:text-yellow-300" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
