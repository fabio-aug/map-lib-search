import React from 'react';
import { Card } from 'antd';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';

import useHistory from '@/hooks/useHistory';

function Template() {
  const history = useHistory();
  return (
    <Layout className='layout'>
      <Header style={headerStyle} onClick={() => history((p) => p.goHome).go()}>
        Home
      </Header>
      <Layout>
        <Content style={contentStyle}>
          <Card style={cardStyle}>
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Template;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#000000',
  cursor: 'pointer'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: 50,
};


const cardStyle: React.CSSProperties = {
  height: '100%'
};
