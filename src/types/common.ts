export interface EntityId {
  id: number;
}
export interface OG {
  type: string;
  title: string;
  url: string;
  images: [
    {
      type?: string;
      url: string;
      secure_url?: string;
      width?: number;
      height?: number;
      alt?: string;
    }
  ];
  audios: [
    {
      type?: string;
      url: string;
      secure_url?: string;
    }
  ];
  videos: [
    {
      type?: string;
      url: string;
      secure_url?: string;
      width: number;
      height: number;
    }
  ];
  favicon_url?: string;
  description?: string;
  locale?: string;
  locale_alternate?: [];
  site_name?: string;
}
