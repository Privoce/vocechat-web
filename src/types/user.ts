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
  avatar?: string;
}
export type UserStatus = "normal" | "frozen";
export type UserDevice = {
  device: string;
  device_token?: string;
  is_online: boolean;
};

export interface UserForAdmin extends User {
  password: string;
  in_online: boolean;
  updated_at: number;
  status: UserStatus;
  online_devices: UserDevice[];
}
export interface UserForAdminDTO
  extends Pick<
    UserForAdmin,
    "email" | "password" | "name" | "gender" | "is_admin" | "language" | "status"
  > {}
export interface UserDTO extends Pick<User, "name" | "gender" | "language"> {}
