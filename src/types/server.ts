// call `organization` in backend
import { User } from "./user";

export interface Server {
  name: string;
  description: string;
}
export interface GithubAuthConfig {
  client_id?: string;
  client_secret?: string;
}
export interface FirebaseConfig {
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
  rtm_key: string;
  rtm_secret: string;
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
