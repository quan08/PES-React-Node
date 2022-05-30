import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SidebarStaff";
type Props = {};
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, BarChartOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { Link } from "react-router-dom";

const AdminLayout = (props: Props) => {
  return (
    <Layout>
    <Header ><h3 style={{float:'left'}} className="text-white mt-2">Pes</h3>
    <button style={{float:'right'}}>Cài đặt cá nhân</button>
    </Header>
    <Layout>
    <Sider  width={200} className="site-layout-background">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item icon={<LaptopOutlined />} ><Link to='table'>Bàn</Link></Menu.Item>
          <Menu.Item icon={<MenuUnfoldOutlined />} ><Link to='menu'>Thực đơn</Link></Menu.Item>
          
        </Menu>
      </Sider>
      <Content><Outlet/></Content>
    </Layout>
  </Layout>
  );
};

export default AdminLayout;
