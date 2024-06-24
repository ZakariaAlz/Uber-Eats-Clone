import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FoodBankIcon from '@mui/icons-material/FoodBank';
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    protected: true
  },
  {
    title: 'articles',
    path: '/dashboard/article',
    icon: <RestaurantMenuIcon />
  },
  {
    title: 'menus',
    path: '/dashboard/menu',
    icon: <FoodBankIcon />
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: icon('ic_cart'),
  }
];

export default navConfig;
