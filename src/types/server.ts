// call `organization` in backend
import { PriceType } from "./common";
import { User } from "./user";

export interface Server extends SystemCommon {
  name: string;
  description: string;
}
export type ChatLayout = "SelfRight" | "Left";
export type MessageExpireMode = "Off" | "Day1" | "Day7" | "Day30" | "Day90" | "Day180";
export interface SystemCommon {
  show_user_online_status?: boolean;
  webclient_auto_update?: boolean;
  contact_verification_enable?: boolean;
  chat_layout_mode?: ChatLayout;
  max_file_expiry_mode?: MessageExpireMode;
  only_admin_can_create_group: boolean;
  who_can_invite_users: boolean;
  ext_setting: null | string;
  msg_smtp_notify_enable: boolean;
  msg_smtp_notify_delay_seconds: number;
}
export interface GithubAuthConfig {
  client_id?: string;
  client_secret?: string;
}
export interface FirebaseConfig {
  use_official: boolean;
  enabled: boolean;
  token_url: string;
  project_id: string;
  private_key: string;
  client_email: string;
}
export interface AgoraConfig {
  enabled: boolean;
  url: string;
  project_id: string;
  app_id: string;
  app_certificate: string;
  customer_id: string;
  customer_secret: string;
}

export interface VocespaceConfig {
  enabled: boolean;
  password: string;
  url: string;
  license: string;
  state: "success" | "undeployed" | "";
  server_type?: "nas" | "vps" | "other";
}

export interface AgoraVoicingListResponse {
  success: boolean;
  data: {
    channels: { channel_name: string; user_count: number }[];
    total_size: number;
  };
}
export interface AgoraChannelUsersResponse {
  success: boolean;
  data: {
    channel_exist: boolean;
    mode?: number;
    total?: number;
    users?: number[];
  };
}
export interface AgoraTokenResponse {
  agora_token: string;
  uid: number;
  channel_name: string;
  expired_in: number;
  app_id: string;
}
export interface SMTPConfig {
  enabled: boolean;
  host: string;
  port: number;
  from: string;
  username: string;
  password: string;
}

export interface GoogleAuthConfig {
  client_id: string;
}
export interface TestEmailDTO {
  to: string;
  content: string;
  subject: string;
}
export type WhoCanSignUp = "EveryOne" | "InvitationOnly";
export type OIDCSetting = {
  enable: boolean;
  favicon: string;
  domain: string;
};
export interface LoginConfig {
  who_can_sign_up: WhoCanSignUp;
  password: boolean;
  magic_link: boolean;
  guest: boolean;
  google: boolean;
  github: boolean;
  oidc: OIDCSetting[];
  metamask: boolean;
  third_party: boolean;
  passkey?: boolean;
}
export interface LicenseResponse {
  domains: string[];
  created_at: string;
  expired_at: string;
  sign: boolean;
  base58: string;
  user_limit: number;
}
export interface LicenseMetadata {
  expire: string;
  user_limit: number;
  domain: string | string[];
}
export interface RenewLicense {
  type: PriceType;
  priceId: string;
  metadata: LicenseMetadata;
  cancel_url: string;
  success_url: string;
}
export interface RenewLicenseResponse {
  session_url: string;
}
export interface CreateAdminDTO extends Pick<User, "email" | "name" | "gender"> {
  password: string;
}
