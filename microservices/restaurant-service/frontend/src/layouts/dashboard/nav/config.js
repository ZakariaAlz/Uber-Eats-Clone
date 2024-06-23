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
    title: 'admin',
    path: '/dashboard/admin',
    icon: icon('ic_admin'),
  },
  {
    title: 'client',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'produit',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: "commande d'Achat d'Article",
    path: '/dashboard/cmdarticle',
    icon: icon('ic_order'),
  },
  {
    title: 'commande de publicité',
    path: '/dashboard/pub',
    icon: icon('ic_blog'),
  },
  {
    title: "versement",
    path: '/dashboard/versement',
    icon: icon('ic_payment'),
  }
];

export default navConfig;
