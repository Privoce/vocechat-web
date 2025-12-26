import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import {
  useGetGroupAnnouncementsQuery,
  useCreateGroupAnnouncementMutation,
  useUpdateGroupAnnouncementMutation,
  useDeleteGroupAnnouncementMutation,
} from "@/app/services/server";
import Button from "@/components/styled/Button";
import Textarea from "@/components/styled/Textarea";
import IconDelete from "@/assets/icons/delete.svg";
import IconEdit from "@/assets/icons/edit.svg";

interface Announcement {
  id: number;
  gid: number;
  content: string;
  created_by: number;
  created_at: string;
}

export default function Announcement({ id = 0 }) {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const channel = useAppSelector((store) => store.channels.byId[id], shallowEqual);
  const { data: announcements = [], refetch } = useGetGroupAnnouncementsQuery(id);
  const [createAnnouncement, { isLoading: creating }] = useCreateGroupAnnouncementMutation();
  const [updateAnnouncement, { isLoading: updating }] = useUpdateGroupAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteGroupAnnouncementMutation();
  
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const canManage = loginUser?.is_admin || channel?.owner === loginUser?.uid;

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    try {
      await createAnnouncement({ gid: id, content: newContent }).unwrap();
      toast.success(ct("tip.create"));
      setNewContent("");
      refetch();
    } catch {
      toast.error(ct("tip.error"));
    }
  };

  const handleUpdate = async (announcementId: number) => {
    if (!editContent.trim()) return;
    try {
      await updateAnnouncement({ gid: id, id: announcementId, content: editContent }).unwrap();
      toast.success(ct("tip.update"));
      setEditingId(null);
      refetch();
    } catch {
      toast.error(ct("tip.error"));
    }
  };

  const handleDelete = async (announcementId: number) => {
    if (!confirm(ct("tip.delete_confirm"))) return;
    try {
      await deleteAnnouncement({ gid: id, id: announcementId }).unwrap();
      toast.success(ct("tip.delete"));
      refetch();
    } catch {
      toast.error(ct("tip.error"));
    }
  };

  const startEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setEditContent(announcement.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  return (
    <ServerVersionChecker empty version="0.5.9">
      <div className="w-full md:w-[512px] flex flex-col gap-4">
        {canManage && (
          <div className="flex flex-col gap-2">
            <Textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={t("channel.announcement_placeholder") || "Enter announcement content..."}
              rows={3}
            />
            <Button onClick={handleCreate} disabled={creating || !newContent.trim()}>
              {creating ? ct("action.creating") : ct("action.create")}
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {announcements.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">
              {t("channel.no_announcements") || "No announcements yet"}
            </p>
          ) : (
            announcements.map((announcement: Announcement) => (
              <div
                key={announcement.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col gap-2"
              >
                {editingId === announcement.id ? (
                  <>
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => handleUpdate(announcement.id)} disabled={updating}>
                        {updating ? ct("action.updating") : ct("action.save")}
                      </Button>
                      <Button onClick={cancelEdit}>{ct("action.cancel")}</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                      {announcement.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{new Date(announcement.created_at).toLocaleString()}</span>
                      {canManage && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(announcement)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          >
                            <IconEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(announcement.id)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          >
                            <IconDelete className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </ServerVersionChecker>
  );
}

