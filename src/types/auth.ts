import { User } from "./user";
export interface AuthToken {
  // common
  server_id: string;
  token: string;
  refresh_token: string;
  expired_in: number;
}

export interface AuthData extends AuthToken {
  initialized?: boolean;
  user: User;
}

export type PasswordCredential = {
  email: string;
  password: string;
  type: "password";
};
export type MagicLinkCredential = {
  magic_token: string;
  extra_name?: string;
  type: "magiclink";
};
export type GoogleCredential = {
  id_token: string;
  magic_token?: string | null;
  type: "google";
};
export type GithubCredential = {
  code: string;
  magic_token?: string | null;
  type: "github";
};
export type OIDCCredential = {
  code: string;
  state: string;
  magic_token?: string | null;
  type: "oidc";
};
export type MetamaskCredential = {
  public_address: string;
  nonce: string;
  signature: string;
  magic_token?: string | null;
  type: "metamask";
};
export type ThirdPartyCredential = {
  key: string;
  type: "thirdparty";
};
export type LoginCredential =
  | PasswordCredential
  | OIDCCredential
  | MetamaskCredential
  | GithubCredential
  | GoogleCredential
  | ThirdPartyCredential
  | MagicLinkCredential;
