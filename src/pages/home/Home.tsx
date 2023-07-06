import { Button, Space } from 'antd';
import useHistory from '@/hooks/useHistory';

function Home() {
  const history = useHistory();
  return (
    <Space direction='horizontal' size='middle'>
      <Button type='primary' onClick={() => history((p) => p.goTrimbleMaps).go()}>
        Trimble Maps
      </Button>
      <Button type='primary' onClick={() => history((p) => p.goDeckGl).go()}>
        deck.gl
      </Button>
      <Button type='primary' onClick={() => history((p) => p.goMapLibre).go()}>
        MapLibre
      </Button>
    </Space>
  );
}

export default Home;
