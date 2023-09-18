// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'productos',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Subir Productos',
    path: '/upload-products',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
