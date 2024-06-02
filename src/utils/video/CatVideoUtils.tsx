import Video1 from '../../assets/video/cat_video1.mp4';
import Video2 from '../../assets/video/cat_video2.mp4';
import Video3 from '../../assets/video/cat_video3.mp4';

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
];
