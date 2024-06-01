// Images
import AmazedCat from '../../assets/images/game/amazed.png';

export interface SponsorshipData {
  name: string;
  title: string;
  image: string;
  backgroundColor: string;
}

export const sponsorData: SponsorshipData = {
  name: 'Cat Food',
  title: 'Cat Food',
  image: AmazedCat,
  backgroundColor: '#751A60'
};
