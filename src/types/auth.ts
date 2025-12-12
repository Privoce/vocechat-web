import { User } from "./user";

export interface AuthToken {
  // common
  server_id: string;
  token: string;
  refresh_token: string;
  expired_in: number;
}
export interface RenewTokenDTO extends Pick<AuthToken, "token" | "refresh_token"> {}
export interface RenewTokenResponse
  extends Pick<AuthToken, "token" | "refresh_token" | "expired_in"> {}

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
export type PasskeyCredential = {
  challenge_id: string;
  credential: PublicKeyCredentialWithResponse;
  type: "passkey";
};
export type LoginCredential =
  | PasswordCredential
  | OIDCCredential
  | MetamaskCredential
  | GithubCredential
  | GoogleCredential
  | ThirdPartyCredential
  | MagicLinkCredential
  | PasskeyCredential;

export type CredentialResponse = {
  password: boolean;
  google: string;
  metamask: string;
  oidc: string[];
};
export interface OIDCConfig {
  enable: boolean;
  favicon: string;
  domain: string;
}

// Passkey types
export interface PublicKeyCredentialWithResponse {
  id: string;
  rawId: string;
  response: {
    clientDataJSON: string;
    attestationObject?: string;
    authenticatorData?: string;
    signature?: string;
    userHandle?: string | null;
  };
  type: string;
}

export interface PasskeyRegisterStartRequest {
  name: string;
}

export interface PasskeyRegisterStartResponse {
  challenge_id: string;
  options: {
    publicKey: PublicKeyCredentialCreationOptions;
  };
}

export interface PasskeyRegisterFinishRequest {
  challenge_id: string;
  credential: PublicKeyCredentialWithResponse;
  name: string;
}

export interface PasskeyLoginStartRequest {
}

export interface PasskeyLoginStartResponse {
  challenge_id: string;
  options: {
    publicKey: PublicKeyCredentialRequestOptions;
  };
}

export interface PasskeyLoginFinishRequest {
  challenge_id: string;
  authentication: PublicKeyCredentialWithResponse;
}

export interface UserPasskey {
  id: number;
  credential_id: string;
  name: string;
  created_at: string;
  last_used_at?: string;
}
