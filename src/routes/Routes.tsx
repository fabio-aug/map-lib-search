import { useRoutes } from 'react-router-dom';

import Paths from '@/routes/Paths';
import { Home, Exemplo1 } from '@/pages';
import Template from '@/components/template/Template';

function Routes() {
  const routes = [{
    element: <Template />,
    children: [
      { path: Paths.pHome, element: <Home /> },
      { path: Paths.pExemplo1, element: <Exemplo1 />}
    ]
  }];
  return useRoutes(routes);
}

export default Routes;
