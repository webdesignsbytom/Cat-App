import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Context
import { UserProvider } from './context/UserContext';
import { PlaylistProvider } from './context/PlaylistContext';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <UserProvider>
    <PlaylistProvider>
      <App />
    </PlaylistProvider>
  </UserProvider>
);
