// call `organization` in backend
import { PriceType } from "./common";
import { User } from "./user";

export interface Server {
  name: string;
  description: string;
}
export interface SystemCommon {
  show_user_online_status: boolean,
  webclient_auto_update: boolean,
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
export interface AgoraVoicingListResponse {
  success: boolean,
  data: {
    channels: { channel_name: string, user_count: number }[],
    total_size: number
  }
}
export interface AgoraChannelUsersResponse {
  success: boolean,
  data: {
    channel_exist: boolean,
    mode?: number,
    total?: number,
    users?: number[]
  }
}
export interface AgoraTokenResponse {
  agora_token: string,
  uid: number,
  channel_name: string,
  expired_in: number,
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
  type: PriceType,
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
