// Images
import Cat1 from '../../assets/images/background/small_cat_blue_1.png'
import Cat2 from '../../assets/images/background/small_cat_white_1.png'
import Cat3 from '../../assets/images/background/small_cat_red_1.png'
// Interfaces
import { OwnedCat } from '../app/AppInterface'

export const UserCats: OwnedCat[] = [
    {   id: '1',
        name: 'Tingles',
        image: Cat1,
        breed: 'Calico',
        favouriteFood: 'Fish',
        dob: new Date('2023-01-01'),
    },
    {   id: '1',
        name: 'Snowball',
        image: Cat2,
        breed: 'Calico',
        favouriteFood: 'Fish',
        dob: new Date('2023-01-01'),
    },
    {   id: '1',
        name: 'Tubs',
        image: Cat3,
        breed: 'Calico',
        favouriteFood: 'Fish',
        dob: new Date('2023-01-01'),
    },
]