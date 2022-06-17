// todo
interface ReadyEvent {
  type: 'ready'
}

interface UsersSnapshotEvent {
  type: 'users_snapshot'
}

interface UsersLogEvent {
  type: 'users_log'
}

interface UsersStateEvent {
  type: 'users_state'
}

interface UsersStateChangedEvent {
  type: 'users_state_changed'
}

interface UserSettingsEvent {
  type: 'user_settings'
}

interface UserSettingsChangedEvent {
  type: 'user_settings_changed'
}

interface RelatedGroupsEvent {
  type: 'related_groups'
}

interface ChatEvent {
  type: 'chat'
}

interface KickEvent {
  type: 'kick'
}

interface UserJoinedGroupEvent {
  type: 'user_joined_group'
}

interface UserLeavedGroupEvent {
  type: 'user_leaved_group'
}

interface JoinedGroupEvent {
  type: 'joined_group'
}

interface KickFromGroupEvent {
  type: 'kick_from_group'
}

interface GroupChangedEvent {
  type: 'group_changed'
}

interface PinnedMessageUpdatedEvent {
  type: 'pinned_message_updated'
}

interface HeartbeatEvent {
  type: 'heartbeat'
}

export type ServerEvent = ReadyEvent |
  UsersSnapshotEvent |
  UsersLogEvent |
  UsersStateEvent |
  UsersStateChangedEvent |
  UserSettingsEvent |
  UserSettingsChangedEvent |
  RelatedGroupsEvent |
  ChatEvent |
  KickEvent |
  UserJoinedGroupEvent |
  UserLeavedGroupEvent |
  JoinedGroupEvent |
  KickFromGroupEvent |
  GroupChangedEvent |
  PinnedMessageUpdatedEvent |
  HeartbeatEvent;
