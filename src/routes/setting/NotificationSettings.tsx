import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";

import {
  useGetAvailableChannelTypesQuery,
  useGetUserChannelsQuery,
  useCreateUserChannelMutation,
  useUpdateUserChannelMutation,
  useDeleteUserChannelMutation,
  useTestUserChannelMutation,
} from "@/app/services/notification";
import { useAppSelector } from "@/app/store";
import { ConfigTip } from "@/components/ConfigTip";
import Button from "@/components/styled/Button";
import Checkbox from "@/components/styled/Checkbox";
import Input from "@/components/styled/Input";
import Textarea from "@/components/styled/Textarea";
import Select from "@/components/styled/Select";
import Label from "@/components/styled/Label";
import Toggle from "@/components/styled/Toggle";
import { UserNotificationChannel, ChannelType, CreateUserChannelDTO } from "@/types/notification";
import { getChannelSchema } from "./AdminNotificationChannels/channelSchemas";
import ServerVersionChecker from "@/components/ServerVersionChecker";

export default function NotificationSettings() {
  const { t } = useTranslation("setting", { keyPrefix: "notification" });
  const [editingChannelId, setEditingChannelId] = useState<number | null>(null);
  const [creatingType, setCreatingType] = useState<ChannelType | null>(null);
  const [formData, setFormData] = useState<Partial<CreateUserChannelDTO>>({});

  // Fetch data
  const { data: availableTypes = [], isLoading: typesLoading } = useGetAvailableChannelTypesQuery();
  const { data: userChannels = [], isLoading: channelsLoading } = useGetUserChannelsQuery();
  const channels = useAppSelector((store) => Object.values(store.channels.byId), shallowEqual);

  // Mutations
  const [createChannel, { isLoading: isCreating }] = useCreateUserChannelMutation();
  const [updateChannel, { isLoading: isUpdating }] = useUpdateUserChannelMutation();
  const [deleteChannel, { isLoading: isDeleting }] = useDeleteUserChannelMutation();
  const [testChannel] = useTestUserChannelMutation();

  const handleCreateClick = (channelType: ChannelType) => {
    setCreatingType(channelType);
    setFormData({
      channel_type: channelType,
      name: "",
      enabled: true,
      config: {},
      trigger_on_all_messages: false,
      trigger_on_mentions: true,
      trigger_on_groups: [],
      skip_when_online: true,
    });
  };

  const handleEditClick = (channel: UserNotificationChannel) => {
    setEditingChannelId(channel.id);
    setFormData({
      channel_type: channel.channel_type,
      name: channel.name,
      enabled: channel.enabled,
      config: channel.config,
      trigger_on_all_messages: channel.trigger_on_all_messages,
      trigger_on_mentions: channel.trigger_on_mentions,
      trigger_on_groups: channel.trigger_on_groups,
      skip_when_online: channel.skip_when_online,
      rate_limit_rps: channel.rate_limit_rps,
    });
  };

  const handleCancel = () => {
    setEditingChannelId(null);
    setCreatingType(null);
    setFormData({});
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      toast.error("Channel name is required");
      return;
    }

    const schema = getChannelSchema(formData.channel_type!);
    if (schema) {
      const missingFields = schema.fields
        .filter((field) => field.required && !formData.config?.[field.name])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        toast.error(`Missing required fields: ${missingFields.join(", ")}`);
        return;
      }
    }

    try {
      if (editingChannelId) {
        await updateChannel({
          id: editingChannelId,
          ...(formData as CreateUserChannelDTO),
        }).unwrap();
        toast.success(t("save_success"));
      } else {
        await createChannel(formData as CreateUserChannelDTO).unwrap();
        toast.success(t("create_success"));
      }
      handleCancel();
    } catch (error) {
      toast.error(editingChannelId ? t("save_error") : t("create_error"));
      console.error("Failed to save channel:", error);
    }
  };

  const handleDelete = async (channelId: number) => {
    try {
      await deleteChannel(channelId).unwrap();
      toast.success(t("delete_success"));
    } catch (error) {
      toast.error(t("delete_error"));
      console.error("Failed to delete channel:", error);
    }
  };

  const handleTest = async (channelId: number) => {
    try {
      await testChannel(channelId).unwrap();
      toast.success(t("test_success"));
    } catch (error) {
      toast.error(t("test_error"));
      console.error("Failed to test channel:", error);
    }
  };

  const handleConfigChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [fieldName]: value,
      },
    }));
  };

  const handleGroupToggle = (groupId: number) => {
    setFormData((prev) => {
      const groups = prev.trigger_on_groups || [];
      const newGroups = groups.includes(groupId)
        ? groups.filter((id) => id !== groupId)
        : [...groups, groupId];
      return { ...prev, trigger_on_groups: newGroups };
    });
  };

  if (typesLoading || channelsLoading) {
    return (
      <div className="setting-container max-md:w-full">
        <div className="text-gray-500">{t("loading")}</div>
      </div>
    );
  }

  if (availableTypes.length === 0) {
    return (
      <div className="setting-container max-md:w-full">
        <ConfigTip title={t("desc")} />
        <div className="text-gray-500 mt-4">{t("no_channels")}</div>
      </div>
    );
  }

  const schema = formData.channel_type ? getChannelSchema(formData.channel_type) : null;
  const isEditing = editingChannelId !== null || creatingType !== null;

  return (
    <ServerVersionChecker version="0.5.11">
      <div className="setting-container max-md:w-full">
      <ConfigTip title={t("desc")} />

      {/* User's Configured Channels */}
      {userChannels.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("my_channels")}
          </h3>
          <div className="space-y-3">
            {userChannels.map((channel) => {
              const channelSchema = getChannelSchema(channel.channel_type);
              return (
                <div
                  key={channel.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {channel.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {channelSchema?.name || channel.channel_type}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {t("status")}:{" "}
                        <span
                          className={
                            channel.enabled
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-500"
                          }
                        >
                          {channel.enabled ? t("enabled") : t("disabled")}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button className="mini" onClick={() => handleEditClick(channel)}>
                        {t("edit")}
                      </Button>
                      <Button className="mini" onClick={() => handleTest(channel.id)}>
                        {t("test")}
                      </Button>
                      <Button
                        className="mini danger"
                        onClick={() => handleDelete(channel.id)}
                        disabled={isDeleting}
                      >
                        {t("delete")}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Channel Types */}
      {!isEditing && (
        <div className="mt-8">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("available_types")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTypes.map((type) => {
              const schema = getChannelSchema(type.id as ChannelType);
              return (
                <div
                  key={type.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 flex flex-col"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {type.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">
                    {type.description}
                  </p>
                  <Button
                    onClick={() => handleCreateClick(type.id as ChannelType)}
                    className="w-full"
                  >
                    {t("create_channel")}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create/Edit Form */}
      {isEditing && formData.channel_type && (
        <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {editingChannelId ? t("edit_channel") : t("create_channel")}
          </h3>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Channel Name */}
            <div>
              <Label className="block mb-2">{t("channel_name")} *</Label>
              <Input
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My Notification Channel"
                className="w-full"
              />
            </div>

            {/* Channel Configuration */}
            {schema && schema.fields.length > 0 && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Label className="block font-semibold mb-3">{t("channel_config")}</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {schema.description}
                </p>

                {schema.fields.map((field) => (
                  <div key={field.name} className="mb-3">
                    <Label className="block mb-2">
                      {field.label} {field.required && "*"}
                    </Label>

                    {field.type === "textarea" ? (
                      <Textarea
                        value={formData.config?.[field.name] || ""}
                        onChange={(e) => handleConfigChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full"
                        rows={3}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        value={formData.config?.[field.name] || ""}
                        onChange={(e) => handleConfigChange(field.name, e.target.value)}
                        className="w-full"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        type={field.type}
                        value={formData.config?.[field.name] || ""}
                        onChange={(e) => handleConfigChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full"
                      />
                    )}

                    {field.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {field.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Enable Channel */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <Label>{t("enable_notifications")}</Label>
              <Toggle
                checked={formData.enabled || false}
                onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
              />
            </div>

            {/* Trigger Conditions */}
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Label className="block font-semibold">{t("trigger_conditions")}</Label>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.trigger_on_all_messages || false}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      trigger_on_all_messages: !formData.trigger_on_all_messages,
                    })
                  }
                />
                <span className="text-sm">{t("trigger_on_all_messages")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.trigger_on_mentions || false}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      trigger_on_mentions: !formData.trigger_on_mentions,
                    })
                  }
                />
                <span className="text-sm">{t("trigger_on_mentions")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.skip_when_online || false}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      skip_when_online: !formData.skip_when_online,
                    })
                  }
                />
                <span className="text-sm">{t("skip_when_online")}</span>
              </div>
            </div>

            {/* Select Groups */}
            {channels.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Label className="block font-semibold">{t("select_groups")}</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {channels.map((group) => (
                    <div key={group.gid} className="flex items-center gap-2">
                      <Checkbox
                        checked={(formData.trigger_on_groups || []).includes(group.gid)}
                        onClick={() => handleGroupToggle(group.gid)}
                      />
                      <span className="text-sm">{group.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={handleSave} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? t("saving") : t("save")}
            </Button>
            <Button onClick={handleCancel} disabled={isCreating || isUpdating}>
              {t("cancel")}
            </Button>
          </div>
        </div>
      )}
    </div>
    </ServerVersionChecker>
  );
}
