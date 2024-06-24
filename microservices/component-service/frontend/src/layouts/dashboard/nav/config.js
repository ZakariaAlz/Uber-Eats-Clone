import ExtensionIcon from '@mui/icons-material/Extension';
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
    title: 'components',
    path: '/dashboard/component',
    icon: <ExtensionIcon />
  }
];

export default navConfig;
