import { ChatEvent } from "./sse";
import { TComboboxItem } from '@udecode/plate-combobox';
export type ContentType =
  | "text/plain"
  | "text/markdown"
  | "vocechat/file"
  | "vocechat/audio"
  | "vocechat/archive";
export type ContentTypeKey = "text" | "markdown" | "file" | "audio" | "archive";

export interface MuteDTO {
  add_users?: {
    uid: number;
    expired_at?: number;
  }[];
  add_groups?: {
    gid: number;
    expired_at?: number;
  }[];
  remove_users?: number[];
  remove_groups?: number[];
}
export interface UploadFileResponse {
  path: string;
  size: number;
  hash: string;
  image_properties?: {
    width: number;
    height: number;
  };
}
export interface ChatMessage extends Omit<ChatEvent, "type"> {}



export type MentionData = TComboboxItem & { data: any };
export type MessageWithMentions = {
  text: string;
  mentions: number[];
};