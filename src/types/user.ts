import { AuthToken } from "./auth";

export type Gender = 0 | 1;

export interface AutoDeleteMsgDTO {
  users?: { uid: number, expires_in: number }[],
  groups?: { gid: number, expires_in: number }[],
}
export interface User {
  uid: number;
  email: string;
  name: string;
  gender: Gender;
  language?: string;
  is_admin: boolean;
  avatar_updated_at: number;
  create_by: string;
  webhook_url?: string;
  is_bot?: boolean;
  log_id?: number;
}
export type ContactAction = "add" | "remove" | "block" | "unblock";
export type ContactStatus = "added" | "blocked" | "";
export type ContactInfo = {
  status: ContactStatus;
  created_at: number;
  updated_at: number;
}
export interface ContactResponse {
  target_uid: number;
  target_info: User;
  contact_info: ContactInfo
}
export interface Contact extends User {
  status: ContactStatus
}
export type UserStatus = "normal" | "frozen";
export type UserDevice = {
  device: string;
  device_token?: string;
  is_online: boolean;
};
export type BotAPIKey = {
  id: number,
  name: string,
  key: string,
  created_at: number,
  last_used: number
};

export interface UserForAdmin extends User {
  password: string;
  in_online: boolean;
  updated_at: number;
  status: UserStatus;
  online_devices: UserDevice[];
}
export interface UserForAdminDTO extends Partial<UserForAdmin> {
  id?: number;
}
export interface UserDTO extends Partial<Pick<User, "name" | "gender" | "language" | "email" | "webhook_url">> {
  password?: string
}
export interface UserCreateDTO extends Pick<User, "name" | "gender" | "language" | "email" | "webhook_url" | "is_bot" | "is_admin"> {
  password: string;
}
export interface UserRegDTO extends Partial<Pick<User, "name" | "gender" | "language" | "email">>, Partial<Pick<UserDevice, "device" | "device_token">> {
  password?: string;
  magic_token?: string
}
export interface UserRegResponse extends AuthToken {
  user: User
}
