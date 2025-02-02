import React, { createContext, useContext, useEffect, useState } from 'react';
// Api
import client from '../api/client';

// Constants

export enum VideoStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DELETED = 'DELETED',
}

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

export interface VideoPlaylistItem {
  id: string;
  videoListData: {};
  currentVideoIndex: number;
  videoList: VideoItem[];
}

interface PlaylistContextType {
  cotdPlaylist: VideoPlaylistItem | null;
  musicPlaylist: VideoPlaylistItem | null;
  comedyPlaylist: VideoPlaylistItem | null;
  setCotdPlaylist: React.Dispatch<React.SetStateAction<VideoPlaylistItem | null>>;
  setMusicPlaylist: React.Dispatch<React.SetStateAction<VideoPlaylistItem | null>>;
  setComedyPlaylist: React.Dispatch<React.SetStateAction<VideoPlaylistItem | null>>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cotdPlaylist, setCotdPlaylist] = useState<VideoPlaylistItem | null>(null);
  const [musicPlaylist, setMusicPlaylist] = useState<VideoPlaylistItem | null>(null);
  const [comedyPlaylist, setComedyPlaylist] = useState<VideoPlaylistItem | null>(null);

  // Fetch playlists from the API
  useEffect(() => {
    const fetchPlaylists = async () => {
      client
      .get(`${GET_BLOG_POSTS_API}?page=${currentPage}&limit=${postsPerPage}`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.error('Unable to retrieve user data', err);
      });

      try {
        // Fetch playlist data from the API (replace with your actual API endpoint)
        const response = await client.get('/playlists');
        const data = await response.data;

        // Assuming the API returns data for each playlist
        setCotdPlaylist({
          id: 'cotd',
          videoListData: data.cotd, // Assuming data.cotd is the list of videos
          currentVideoIndex: 0,
          videoList: data.cotd.map((item: any) => ({
            id: item.id,
            label: item.label,
            name: item.name,
            videoStatus: item.videoStatus,
            path: item.path,
            size: item.size,
            duration: item.duration,
            isDelete: item.isDelete,
            createdAt: new Date(item.createdAt),
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
          })),
        });

        setMusicPlaylist({
          id: 'music',
          videoListData: data.music, // Assuming data.music is the list of videos
          currentVideoIndex: 0,
          videoList: data.music.map((item: any) => ({
            id: item.id,
            label: item.label,
            name: item.name,
            videoStatus: item.videoStatus,
            path: item.path,
            size: item.size,
            duration: item.duration,
            isDelete: item.isDelete,
            createdAt: new Date(item.createdAt),
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
          })),
        });

        setComedyPlaylist({
          id: 'comedy',
          videoListData: data.comedy, // Assuming data.comedy is the list of videos
          currentVideoIndex: 0,
          videoList: data.comedy.map((item: any) => ({
            id: item.id,
            label: item.label,
            name: item.name,
            videoStatus: item.videoStatus,
            path: item.path,
            size: item.size,
            duration: item.duration,
            isDelete: item.isDelete,
            createdAt: new Date(item.createdAt),
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
          })),
        });
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        cotdPlaylist,
        musicPlaylist,
        comedyPlaylist,
        setCotdPlaylist,
        setMusicPlaylist,
        setComedyPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};
