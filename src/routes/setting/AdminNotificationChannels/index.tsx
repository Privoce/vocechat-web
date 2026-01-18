import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import {
  useGetEnabledChannelTypesQuery,
  useToggleChannelTypeMutation,
  useDeleteChannelTypeMutation,
} from "@/app/services/notification";
import { ConfigTip } from "@/components/ConfigTip";
import Button from "@/components/styled/Button";
import Toggle from "@/components/styled/Toggle";
import { EnabledChannelType, ChannelType } from "@/types/notification";
import { channelSchemas } from "./channelSchemas";
import ServerVersionChecker from "@/components/ServerVersionChecker";

export default function AdminNotificationChannels() {
  const { t } = useTranslation("setting", { keyPrefix: "admin_notification_channels" });
  const { data: channelTypes = [], isLoading } = useGetEnabledChannelTypesQuery();
  const [toggleChannelType] = useToggleChannelTypeMutation();
  const [deleteChannelType] = useDeleteChannelTypeMutation();

  const [deletingType, setDeletingType] = useState<string | null>(null);

  const handleToggle = async (channelType: ChannelType, currentEnabled: boolean) => {
    try {
      await toggleChannelType({
        channel_type: channelType,
        enabled: !currentEnabled,
      }).unwrap();
      toast.success(t("update_success"));
    } catch (error) {
      toast.error(t("update_error"));
      console.error("Failed to toggle channel type:", error);
    }
  };

  const handleDelete = async (channelType: string) => {
    try {
      await deleteChannelType(channelType).unwrap();
      toast.success(t("delete_success"));
      setDeletingType(null);
    } catch (error) {
      toast.error(t("delete_error"));
      console.error("Failed to delete channel type:", error);
    }
  };

  const handleEnableNew = async (channelType: ChannelType) => {
    try {
      await toggleChannelType({
        channel_type: channelType,
        enabled: true,
      }).unwrap();
      toast.success(t("create_success"));
    } catch (error) {
      toast.error(t("create_error"));
      console.error("Failed to enable channel type:", error);
    }
  };

  // Get all available channel types
  const allChannelTypes = channelSchemas.map((s) => s.type);
  const enabledTypes = new Set(channelTypes.map((ct) => ct.channel_type));
  const availableToEnable = allChannelTypes.filter((type) => !enabledTypes.has(type));

  // Debug logging
  console.log("Admin Notification Channels Debug:", {
    allChannelTypes,
    enabledTypes: Array.from(enabledTypes),
    availableToEnable,
    channelTypesFromAPI: channelTypes,
  });

  if (isLoading) {
    return (
      <div className="setting-container max-md:w-full">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <ServerVersionChecker version="0.5.11">
      <div className="setting-container max-md:w-full">
      <ConfigTip title={t("desc")} />

      {/* Enabled Channel Types */}
      {channelTypes.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("enabled_types")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    {t("channel_type")}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    {t("channel_status")}
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {channelTypes.map((channelType) => {
                  const schema = channelSchemas.find((s) => s.type === channelType.channel_type);
                  return (
                    <tr
                      key={channelType.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {schema?.name || channelType.channel_type}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {schema?.description}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Toggle
                            checked={channelType.enabled}
                            onClick={() =>
                              handleToggle(channelType.channel_type, channelType.enabled)
                            }
                          />
                          <span
                            className={
                              channelType.enabled
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-500"
                            }
                          >
                            {channelType.enabled ? t("enabled") : t("disabled")}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            className="mini danger"
                            onClick={() => setDeletingType(channelType.channel_type)}
                          >
                            {t("delete_channel")}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Channel Types to Enable */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t("available_types")}
        </h3>
        {availableToEnable.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableToEnable.map((type) => {
              const schema = channelSchemas.find((s) => s.type === type);
              if (!schema) return null;
              return (
                <div
                  key={type}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 flex flex-col"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {schema.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">
                    {schema.description}
                  </p>
                  <Button onClick={() => handleEnableNew(type)} className="w-full">
                    {t("enable_type")}
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            All channel types are already enabled. Total schemas: {channelSchemas.length}
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t("delete_title")}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t("delete_desc")}
            </p>
            <div className="flex gap-3 justify-end">
              <Button onClick={() => setDeletingType(null)} className="cancel">
                {t("cancel")}
              </Button>
              <Button onClick={() => handleDelete(deletingType)} className="danger">
                {t("delete")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </ServerVersionChecker>
  );
}
