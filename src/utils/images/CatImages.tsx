// Images
import Image1 from '../../assets/images/ai/cat_ai_image_1.png';
import Image2 from '../../assets/images/ai/cat_ai_image_2.png';
import Image3 from '../../assets/images/ai/cat_ai_image_3.png';
import Image4 from '../../assets/images/ai/cat_ai_image_4.png';

export interface CatImage {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
}

export const arrayOfCatImages: CatImage[] = [
  { id: 1, name: 'Cat Image 1', imageUrl: Image1, category: 'cat' },
  { id: 2, name: 'Cat Image 2', imageUrl: Image2, category: 'cat' },
  { id: 3, name: 'Cat Image 3', imageUrl: Image3, category: 'cat' },
  { id: 4, name: 'Cat Image 4', imageUrl: Image4, category: 'cat' },
];

// Images
import History1 from '../../assets/images/history/ai_history_cat_1.png'
import History2 from '../../assets/images/history/ai_history_cat_2.png'
import History3 from '../../assets/images/history/ai_history_cat_3.png'
import History4 from '../../assets/images/history/ai_history_cat_4.png'

// Slideshow images
export const slideshowImages: CatImage[] = [
  {
    id: 1,
    name: 'Slideshow Image 1',
    imageUrl: History1,
    category: 'slideshow',
  },
  {
    id: 2,
    name: 'Slideshow Image 2',
    imageUrl: History2,
    category: 'slideshow',
  },
  {
    id: 3,
    name: 'Slideshow Image 3',
    imageUrl: History3,
    category: 'slideshow',
  },
  {
    id: 4,
    name: 'Slideshow Image 4',
    imageUrl: History4,
    category: 'slideshow',
  },
];