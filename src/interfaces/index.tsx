export enum VideoStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DELETED = 'DELETED',
}

// Interface for Video
export interface VideoItem {
  id: string;
  label: string;
  name: string;
  videoStatus: VideoStatus;
  path: string;
  size: number;
  duration: number; // in seconds or float representing duration
  codec?: string;
  width?: number; // optional
  height?: number; // optional
  isDelete: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

// Define VideoList interface to handle both CatVideo and Video properties
export interface VideoPlaylistItem {
    id: string;
    videoListData: {};
    currentVideoIndex: number;
    videoList: VideoItem[];
  }
// export interface VideoPlaylistItem {
//     id: string;
//     videoListData: {};
//     currentVideoIndex: number;
//     videoList: VideoItem[];
//   }
  