//call `group` in backend
import { ContentType } from "./message";

export interface ChannelMember {}

export interface Message {}

export interface PinnedMessage {
  mid: number;
  content: string;
  content_type: ContentType;
  created_by: number;
  created_at: number;
  properties: {
    local_id?: number;
    content_type?: string;
    size?: number;
  };
}

export interface Channel {
  gid: number;
  owner: number;
  name: string;
  description: string;
  icon?: string;
  members: number[];
  is_public: boolean;
  avatar_updated_at: number;
  pinned_messages: PinnedMessage[];
}

export interface CreateChannelDTO {
  name: string;
  description: string;
  members?: number[];
  is_public: boolean;
}

export interface ChannelDTO extends Partial<Pick<Channel, "owner" | "description" | "name">> {
  id: number;
}

export interface UpdateChannelDTO {
  operation?: "add_member" | "remove_member";
  members?: number[];
  gid: number; // todo check
  name?: string;
  description?: string;
  owner?: number;
  avatar_updated_at?: number;
  type?: string;
  uid?: number[];
  icon?: string;
}

export interface UpdatePinnedMessageDTO {
  gid: number;
  mid: number;
  msg: PinnedMessage;
}
