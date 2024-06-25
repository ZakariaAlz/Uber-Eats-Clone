import ExtensionIcon from '@mui/icons-material/Extension';
import HubIcon from '@mui/icons-material/Hub';

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
    title: 'componenets',
    path: '/dashboard/component',
    icon: <ExtensionIcon />
  },
  {
    title: 'logs',
    path: '/dashboard/log',
    icon: <HubIcon />
  }
];

export default navConfig;
