// Notification channel types

/**
 * Channel types supported by the notification system
 */
export type ChannelType =
  | 'telegram' | 'discord' | 'feishu' | 'dingtalk'
  | 'wecombot' | 'bark' | 'gotify' | 'serverchan'
  | 'pushdeer' | 'matrix' | 'custom_json';

/**
 * Available channel type (returned by user API)
 */
export interface AvailableChannelType {
  id: string; // channel_type as string
  name: string;
  description: string;
}

/**
 * Admin: Enabled channel type configuration
 */
export interface EnabledChannelType {
  id: number;
  channel_type: ChannelType;
  enabled: boolean;
  created_at: number;
  updated_at: number;
}

/**
 * Admin: DTO for enabling/disabling channel type
 */
export interface ToggleChannelTypeDTO {
  channel_type: ChannelType;
  enabled: boolean;
}

/**
 * User: Notification channel configuration
 */
export interface UserNotificationChannel {
  id: number;
  user_id: number;
  channel_type: ChannelType;
  name: string;
  enabled: boolean;
  config: Record<string, any>;
  trigger_on_all_messages: boolean;
  trigger_on_mentions: boolean;
  trigger_on_groups: number[];
  skip_when_online: boolean;
  rate_limit_rps?: number;
  created_at: number;
  updated_at: number;
}

/**
 * User: DTO for creating user notification channel
 */
export interface CreateUserChannelDTO {
  channel_type: ChannelType;
  name: string;
  enabled: boolean;
  config: Record<string, any>;
  trigger_on_all_messages: boolean;
  trigger_on_mentions: boolean;
  trigger_on_groups: number[];
  skip_when_online: boolean;
  rate_limit_rps?: number;
}

/**
 * User: DTO for updating user notification channel
 */
export interface UpdateUserChannelDTO extends CreateUserChannelDTO {
  id: number;
}

/**
 * Schema definition for channel configuration fields
 */
export interface ChannelFieldSchema {
  name: string;
  type: 'text' | 'url' | 'number' | 'textarea' | 'select';
  label: string;
  placeholder?: string;
  required: boolean;
  description?: string;
  options?: { value: string; label: string }[];
}

/**
 * Schema definition for a channel type
 */
export interface ChannelSchema {
  type: ChannelType;
  name: string;
  description: string;
  fields: ChannelFieldSchema[];
}
