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
    title: 'article',
    path: '/dashboard/article',
    icon: icon('ic_admin'),
  },
  {
    title: 'menu',
    path: '/dashboard/menu',
    icon: icon('ic_user'),
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: icon('ic_cart'),
  }
];

export default navConfig;
