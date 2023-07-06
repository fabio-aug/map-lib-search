import { useRoutes, Navigate } from 'react-router-dom';

import Paths from '@/routes/Paths';
import Template from '@/components/Template';
import {
  Home,
  DeckGl,
  MapLibre,
  TrimbleMapsComponent
} from '@/pages';

function Routes() {
  const routes = [{
    element: <Template />,
    children: [
      { path: Paths.pHome, element: <Home /> },
      { path: Paths.pDeckGl, element: <DeckGl />},
      { path: Paths.pMapLibre, element: <MapLibre />},
      { path: Paths.pTrimbleMaps, element: <TrimbleMapsComponent />},
      { path: '/', element: <Navigate to={Paths.pHome} />},
      { path: '*', element: <Navigate to={Paths.pHome} />}
    ]
  }];
  return useRoutes(routes);
}

export default Routes;
