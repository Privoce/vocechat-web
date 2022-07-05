export interface ArchiveUser {
  name: string;
  avatar?: number;
}
export interface ArchiveMessage {
  from_user: number;
  created_at: number;
  mid: number;
  source: { uid: number } | { gid: number };
  properties?: object;
  content_type: string;
  content?: string;
  file_id?: number;
  thumbnail_id?: number;
}
export interface Archive {
  users: ArchiveUser[];
  messages: ArchiveMessage[];
  num_attachments: number;
}
// 上传文件API响应
export interface UploadResponse {
  path: string;
  size: number;
  hash: string;
  image_properties?: {
    width: number;
    height: number;
  };
}
