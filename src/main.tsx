import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Context
import { VideoProvider } from './context/VideoContext';
import { UserProvider } from './context/UserContext';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <VideoProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </VideoProvider>
);
