export interface Archive {
  users: ArchiveUser[];
  messages: ArchiveMessage[];
  num_attachments: number;
}
export interface ArchiveUser {
  name: string;
  avatar?: number | string;
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
export interface FavoriteArchive {
  id: string;
  created_at: number;
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
// Open Graph
export interface OG {
  type?: string;
  title: string;
  url: string;
  images: {
    type?: string;
    url: string;
    secure_url?: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
  audios: {
    type?: string;
    url: string;
    secure_url?: string;
  }[];
  videos: {
    type?: string;
    url: string;
    secure_url?: string;
    width: number;
    height: number;
  }[];
  favicon_url?: string;
  description?: string;
  locale?: string;
  locale_alternate?: [];
  site_name?: string;
}
export interface VoceChatFile {
  mid: number;
  from_uid: number;
  gid: number;
  ext: string;
  content_type: string;
  content: string;
  properties: string;
  created_at: number;
  expired: boolean;
}
export type FileType = "Doc" | "PDF" | "Image" | "Audio" | "Video";
export type FileCreateTime = "Day1" | "Day7" | "Day30" | "Day90" | "Day180";
export interface GetFilesDTO {
  uid?: number;
  gid?: number;
  file_type?: FileType;
  creation_time_type?: FileCreateTime;
  page?: number;
  page_size?: number;
}
