import { useState } from "react";
import { useTranslation } from "react-i18next";
import IconClose from "@/assets/icons/close.svg";

interface Announcement {
  id: number;
  content: string;
  created_at: string;
}

interface Props {
  announcement: Announcement;
  onExpand: () => void;
}

export default function AnnouncementBanner({ announcement, onExpand }: Props) {
  const { t } = useTranslation("chat");
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-5 py-2 flex items-center justify-between">
      <div onClick={onExpand} className="flex-1 flex items-center gap-2 min-w-0 cursor-pointer">
        <span className="text-xs font-semibold text-yellow-800 dark:text-yellow-200 whitespace-nowrap">
          📢 {t("announcement")}:
        </span>
        <span className="text-sm text-yellow-900 dark:text-yellow-100 truncate">
          {announcement.content}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
        className="ml-2 p-1 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded"
      >
        <IconClose className="w-3 h-3 fill-yellow-800 dark:fill-yellow-200" />
      </button>
    </div>
  );
}

