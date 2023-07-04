import React from 'react';
import { Button } from 'antd';
import useHistory from '@/hooks/useHistory';

function Home() {
  const history = useHistory();
  return (
    <React.Fragment>
      <Button type='primary' onClick={() => history((p) => p.goTrimbleMaps).go()}>
        Trimble Maps
      </Button>
    </React.Fragment>
  );
}

export default Home;
