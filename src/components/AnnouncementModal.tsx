import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
import Button from "@/components/styled/Button";

interface Announcement {
  id: number;
  content: string;
  created_at: string;
  created_by: number;
}

interface Props {
  announcements: Announcement[];
  onClose: () => void;
  cid: number;
}

export default function AnnouncementModal({ announcements, onClose, cid }: Props) {
  const { t } = useTranslation("chat");

  return (
    <Modal>
      <div className="flex flex-col gap-4 w-full md:w-[500px] max-h-[70vh] bg-white dark:bg-gray-900 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          📢 {t("channel_announcements")}
        </h3>
        <div className="flex flex-col gap-3 overflow-y-auto">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                {announcement.content}
              </p>
              <div className="mt-2 text-xs text-gray-400">
                {new Date(announcement.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Link to={`/setting/channel/${cid}/announcement`} className="flex-1">
            <Button className="w-full">{t("view_all", "查看全部")}</Button>
          </Link>
          <Button onClick={onClose} className="flex-1">{t("action.close", "Close")}</Button>
        </div>
      </div>
    </Modal>
  );
}

