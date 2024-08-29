import React from 'react';
import { Layout, theme } from 'antd';
import LayoutTypography from '../../components/layout/LayoutTypography.tsx';
import LayoutMenu from '../../components/layout/LayoutMenu.tsx';

interface Props{
  children: React.ReactNode;
}
const { Header, Content, Footer } = Layout;

const Apps = ({children}:Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <LayoutTypography/>
        <LayoutMenu/>
      </Header>
      <Content style={{ margin: '48px 0',padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Apps;