import { useRoutes } from 'react-router-dom';

import PublicRoutes from './public';
import PrivateRoutes from './private';

const Routes = () => useRoutes([PublicRoutes, PrivateRoutes]);

export default Routes;
