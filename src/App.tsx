import { BrowserRouter as RoutesProvider } from 'react-router-dom';

import Routes from '@/routes/Routes';

function App() {
  return (
    <RoutesProvider>
      <Routes />
    </RoutesProvider>
  );
}

export default App;
