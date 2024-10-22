import React, { createContext, useContext, useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Interfaces
import { UserToken, NewUser, User } from '../utils/user/UserInterfaces';
// Constants
import { ACCOUNT_TOKEN_NAME, TOKEN_NAME } from '../utils/contstants/Constants';
import { Playlist } from '../utils/video/CatVideoUtils';

interface PlaylistContextType {
  cotdPlaylist: Playlist | null;
  setCotdPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export const PlaylistProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cotdPlaylist, setCotdPlaylist] = useState<Playlist | null>(null);

  console.log('cotdPlaylist', cotdPlaylist);
  
  return (
    <PlaylistContext.Provider value={{ cotdPlaylist, setCotdPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('Playlist must be used');
  }
  return context;
};
