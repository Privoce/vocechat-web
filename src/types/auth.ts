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
