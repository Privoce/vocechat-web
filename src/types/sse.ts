import { ContactInfo, User } from "./user";
import { Channel } from "./channel";
import { ContentType } from "./message";

export interface ReadyEvent {
  type: "ready";
}

export interface UsersSnapshotEvent {
  type: "users_snapshot";
  users: User[];
  version: number;
}

// todo: check if create_by field exists
export interface UserLog extends Omit<User, "create_by"> {
  log_id: number;
  action: "create" | "update" | "delete";
}

export interface UsersLogEvent {
  type: "users_log";
  logs: UserLog[];
}

export interface UserState {
  uid: number;
  online: boolean;
}

export interface UsersStateEvent {
  type: "users_state";
  users: UserState[];
}

interface UsersStateChangedEvent extends UserState {
  type: "users_state_changed";
}

export interface MuteUser {
  uid: number;
  expired_at: number;
}

export interface MuteChannel {
  gid: number;
  expired_at: number;
}
export type AutoDeleteMsgForUser = {
  uid: number; expires_in: number | null
}
export type AutoDeleteMsgForGroup = {
  gid: number; expires_in: number | null
}
export type UserSettingsEvent = {
  type: "user_settings";
  mute_users?: MuteUser[];
  mute_groups?: MuteChannel[];
  read_index_users?: { uid: number; mid: number }[];
  read_index_groups?: { gid: number; mid: number }[];
  burn_after_reading_users?: AutoDeleteMsgForUser[];
  burn_after_reading_groups?: AutoDeleteMsgForGroup[];
}
export type AutoDeleteSettingForUsers = {
  burn_after_reading_users: AutoDeleteMsgForUser[]
}
export type AutoDeleteSettingForChannels = {
  burn_after_reading_groups: AutoDeleteMsgForGroup[]
}
export type AutoDeleteMessageSettingDTO = AutoDeleteSettingForUsers | AutoDeleteSettingForChannels
export type UserSettingsChangedEvent = {
  type: "user_settings_changed";
  from_device?: string;
  add_mute_users?: MuteUser[];
  remove_mute_users?: number[];
  add_mute_groups?: MuteChannel[];
  add_contacts?: { target_uid: number, info: ContactInfo }[];
  remove_contacts?: number[];
  remove_mute_groups?: number[];
  add_pin_chats?: PinChat[];
  remove_pin_chats?: PinChatTarget[];
  read_index_users?: { uid: number; mid: number }[];
  read_index_groups?: { gid: number; mid: number }[];
  burn_after_reading_users?: AutoDeleteMsgForUser[];
  burn_after_reading_groups?: AutoDeleteMsgForGroup[];
}

export interface RelatedGroupsEvent {
  type: "related_groups";
  groups: Channel[];
}
export type PinChatTargetUser = {
  uid: number;
};
export type PinChatTargetChannel = {
  gid: number;
};
export type PinChatTarget = PinChatTargetUser | PinChatTargetChannel;
export type PinChat = { target: PinChatTarget[], updated_at: number }
export interface PinnedChatsEvent {
  type: "pinned_chats";
  chats: PinChat[];
}

export interface NormalMessage {
  mid: number;
  type: "normal";
  properties: {};
  content_type: ContentType;
  content: string;
  expires_in: number;
}

export interface EditReactionDetail {
  properties: {};
  content_type: ContentType;
  content: string;
  type: "edit";
}
export interface LikeReactionDetail {
  action: string;
  type: "like";
}
export interface DeleteReactionDetail {
  type: "delete";
}
export interface ReactionMessage {
  type: "reaction";
  mid: number; // original message id
  detail: EditReactionDetail | LikeReactionDetail | DeleteReactionDetail;
}

export interface ReplyMessage {
  type: "reply";
  mid: number; // original message id
  properties: {};
  content_type: ContentType;
  content: string;
}
type MessageTargetUser = {
  uid: number;
};
type MessageTargetChannel = {
  gid: number;
};
export interface ChatEvent {
  type: "chat";
  mid: number;
  from_uid: number;
  created_at: number;
  target: MessageTargetChannel | MessageTargetUser;
  detail: NormalMessage | ReactionMessage | ReplyMessage;
}

interface KickEvent {
  type: "kick";
  reason: string;
}

interface UserJoinedGroupEvent {
  type: "user_joined_group";
  gid: number;
  uid: number[];
}

interface UserLeavedGroupEvent {
  type: "user_leaved_group";
  gid: number;
  uid: number[];
}

interface JoinedGroupEvent {
  type: "joined_group";
  group: Channel;
}

interface KickFromGroupEvent {
  type: "kick_from_group";
  gid: number;
  reason: string;
}

interface GroupChangedEvent {
  type: "group_changed";
  gid: number;
  name: string;
  description: string;
  owner: number;
  avatar_updated_at: number;
}

interface PinnedMessageUpdatedEvent {
  type: "pinned_message_updated";
  gid: number;
  mid: number;
  msg: {
    mid: number;
    created_by: number;
    created_at: number;
    properties: {};
    content: string;
    content_type: ContentType;
  };
}

interface HeartbeatEvent {
  type: "heartbeat";
  time: number;
}
interface GroupClearEvent {
  type: "group_message_cleared";
  gid: number;
}

export type ServerEvent =
  | ReadyEvent
  | UsersSnapshotEvent
  | UsersLogEvent
  | UsersStateEvent
  | UsersStateChangedEvent
  | UserSettingsEvent
  | UserSettingsChangedEvent
  | RelatedGroupsEvent
  | ChatEvent
  | KickEvent
  | UserJoinedGroupEvent
  | UserLeavedGroupEvent
  | JoinedGroupEvent
  | KickFromGroupEvent
  | GroupChangedEvent
  | PinnedMessageUpdatedEvent
  | HeartbeatEvent
  | GroupClearEvent
  | PinnedChatsEvent;
