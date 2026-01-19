import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import {
  useGetGroupAnnouncementQuery,
  useCreateOrUpdateGroupAnnouncementMutation,
  useDeleteGroupAnnouncementMutation,
} from "@/app/services/server";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import Label from "@/components/styled/Label";
import Button from "@/components/styled/Button";
import Textarea from "@/components/styled/Textarea";
import MarkdownRender from "@/components/MarkdownRender";
import { shallowEqual } from "react-redux";
import { compareVersion } from "@/utils";

export default function Announcement({ id = 0 }) {
  const { t } = useTranslation("setting", { keyPrefix: "channel" });
  const { t: ct } = useTranslation();
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const channel = useAppSelector((store) => store.channels.byId[id], shallowEqual);
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);

  // Check if server version supports announcements
  const isVersionSupported = useMemo(() => {
    return currentVersion && compareVersion(currentVersion, "0.5.13") >= 0;
  }, [currentVersion]);

  const { data: announcementResponse, refetch } = useGetGroupAnnouncementQuery(id, {
    skip: !id || !isVersionSupported
  });
  const [createOrUpdate, { isSuccess: saveSuccess, isLoading: saving }] =
    useCreateOrUpdateGroupAnnouncementMutation();
  const [deleteAnnouncement, { isSuccess: deleteSuccess, isLoading: deleting }] =
    useDeleteGroupAnnouncementMutation();

  const [content, setContent] = useState("");
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const announcement = announcementResponse?.announcement;
  const canManage = loginUser?.is_admin || channel?.owner === loginUser?.uid;

  useEffect(() => {
    if (announcement) {
      setContent(announcement.content);
    }
  }, [announcement]);

  useEffect(() => {
    if (saveSuccess) {
      toast.success(ct("tip.update"));
      refetch();
    }
  }, [saveSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Announcement deleted");
      setContent("");
      setShowDeleteConfirm(false);
      refetch();
    }
  }, [deleteSuccess]);

  const handleSave = () => {
    if (!content.trim()) {
      toast.error("Announcement content cannot be empty");
      return;
    }
    if (content.length > 5000) {
      toast.error("Announcement content cannot exceed 5000 characters");
      return;
    }
    createOrUpdate({ gid: id, content: content.trim() });
  };

  const handleDelete = () => {
    deleteAnnouncement(id);
  };

  return (
    <ServerVersionChecker version="0.5.13">
      {!canManage ? (
        <div className="w-[512px] p-4 text-gray-500 dark:text-gray-400">
          {t("no_permission") || "You don't have permission to manage announcements"}
        </div>
      ) : (
        <div className="w-[512px] flex flex-col gap-6 h-full mb-10">
          <div className="flex flex-col gap-2">
            <Label>Channel Announcement</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create or update the announcement for this channel. Members will see it as a popup when
              it's new or updated.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setMode("edit")}
              className={`px-4 py-2 font-medium transition-colors ${
                mode === "edit"
                  ? "text-primary-500 border-b-2 border-primary-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setMode("preview")}
              className={`px-4 py-2 font-medium transition-colors ${
                mode === "preview"
                  ? "text-primary-500 border-b-2 border-primary-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Preview
            </button>
          </div>

          {/* Content Area */}
          {mode === "edit" ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder={
                  t("announcement_placeholder") ||
                  "Write your announcement here... Markdown is supported."
                }
                className="font-mono"
              />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {content.length} / 5000 characters
                </span>
                {content.length > 5000 && (
                  <span className="text-red-500">Character limit exceeded</span>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 dark:border-gray-700 rounded p-4 min-h-[300px] bg-gray-50 dark:bg-gray-900">
              {content.trim() ? (
                <MarkdownRender content={content} />
              ) : (
                <p className="text-gray-400 dark:text-gray-500 italic">
                  {t("no_announcements") || "No content to preview"}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving || !content.trim() || content.length > 5000}>
              {saving ? "Saving..." : announcement ? "Update Announcement" : "Create Announcement"}
            </Button>

            {announcement && (
              <>
                {!showDeleteConfirm ? (
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="!bg-red-500 hover:!bg-red-600"
                    disabled={deleting}
                  >
                    Delete
                  </Button>
                ) : (
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure?
                    </span>
                    <Button
                      onClick={handleDelete}
                      className="!bg-red-500 hover:!bg-red-600"
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Confirm Delete"}
                    </Button>
                    <Button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="!bg-gray-500 hover:!bg-gray-600"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </ServerVersionChecker>
  );
}
