export interface AuthToken {
  // common
  server_id: string;
  token: string;
  refresh_token: string;
  expired_in: number;
}

export type Gender = 0 | 1;

export interface User {
  uid: number;
  email: string;
  name: string;
  gender: Gender;
  language: string;
  is_admin: boolean;
  avatar_updated_at: number;
  create_by: string;
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
