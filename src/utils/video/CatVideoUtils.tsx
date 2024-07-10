import Video1 from '../../assets/video/cat_video1.mp4';
import Video2 from '../../assets/video/cat_video2.mp4';
import Video3 from '../../assets/video/cat_video3.mp4';
import Video4 from '../../assets/video/cat_video4.mp4';
import Video5 from '../../assets/video/cat_video5.mp4';
import Video6 from '../../assets/video/cat_video6.mp4';
import Video7 from '../../assets/video/cat_video7.mp4';
import Video8 from '../../assets/video/cat_video8.mp4';

export interface CatVideo {
  id: number;
  name: string;
  videoUrl: string;
  category: string;
}

export const cotdVideos: CatVideo[] = [
  { id: 1, name: 'Cat Video 1', videoUrl: Video1, category: 'cat' },
  { id: 2, name: 'Cat Video 2', videoUrl: Video2, category: 'cat' },
  { id: 3, name: 'Cat Video 3', videoUrl: Video3, category: 'cat' },
  { id: 4, name: 'Cat Video 4', videoUrl: Video4, category: 'cat' },
  { id: 5, name: 'Cat Video 5', videoUrl: Video5, category: 'cat' },
  { id: 6, name: 'Cat Video 6', videoUrl: Video6, category: 'cat' },
  { id: 7, name: 'Cat Video 7', videoUrl: Video7, category: 'cat' },
  { id: 8, name: 'Cat Video 8', videoUrl: Video8, category: 'cat' },
];

export const endlessVideos: CatVideo[] = [
  { id: 1, name: 'Cat Video 1', videoUrl: Video1, category: 'cat' },
  { id: 2, name: 'Cat Video 2', videoUrl: Video2, category: 'cat' },
  { id: 3, name: 'Cat Video 3', videoUrl: Video3, category: 'cat' },
];

export const therapyVideos: CatVideo[] = [
  { id: 1, name: 'Cat Video 1', videoUrl: Video1, category: 'cat' },
  { id: 2, name: 'Cat Video 2', videoUrl: Video2, category: 'cat' },
  { id: 3, name: 'Cat Video 3', videoUrl: Video3, category: 'cat' },
];
