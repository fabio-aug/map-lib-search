import { useRoutes, Navigate } from 'react-router-dom';

import Paths from '@/routes/Paths';
import { Home, TrimbleMapsComponent } from '@/pages';
import Template from '@/components/Template';

function Routes() {
  const routes = [{
    element: <Template />,
    children: [
      { path: Paths.pHome, element: <Home /> },
      { path: Paths.pTrimbleMaps, element: <TrimbleMapsComponent />},
      { path: '/', element: <Navigate to={Paths.pHome} />},
      { path: '*', element: <Navigate to={Paths.pHome} />}
    ]
  }];
  return useRoutes(routes);
}

export default Routes;
