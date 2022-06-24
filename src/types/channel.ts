export interface ChannelMember {}

export interface Message {}

export type ContentType = "text/plain" | "text/markdown" | "rustchat/file" | "rustchat/archive";

export interface PinnedMessage {
  mid: number;
  content: string;
  content_type: ContentType;
  created_by: number;
  created_at: number;
  properties: {
    local_id?: string;
  };
}

export interface Channel {
  gid: number;
  // icon: string; // todo: check
  owner: number;
  name: string;
  description: string;
  members: number[];
  is_public: boolean;
  avatar_updated_at: number;
  pinned_messages: PinnedMessage[];
}

export interface UpdateChannelDTO {
  operation: "add_member" | "remove_member";
  members?: number[];

  // type = 'group_changed'
  gid: number; // todo check
  name?: string;
  description?: string;
  owner?: number;
  avatar_updated_at?: number;
  type?: string;
  // type = 'user_joined_group' | 'user_leaved_group'
  // gid
  uid?: number[];
}

export interface UpdatePinnedMessageDTO {
  gid: number;
  mid: number;
  msg: PinnedMessage;
}
