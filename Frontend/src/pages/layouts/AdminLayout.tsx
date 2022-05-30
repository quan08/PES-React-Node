import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SidebarAdmin";
type Props = {};
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, BarChartOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { Link } from "react-router-dom";

const AdminLayout = (props: Props) => {
  return (
    <Layout>
    <Header><h3 className="text-white mt-2">Pes</h3></Header>
    <Layout>
    <Sider  width={200} className="site-layout-background">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          
          <Menu.Item icon={<BarChartOutlined />} ><Link to='/admin'>Dashboard</Link></Menu.Item>
          <Menu.Item icon={<UserOutlined />} ><Link to='staff'>Staff</Link></Menu.Item>
          <Menu.Item icon={<MenuUnfoldOutlined />} ><Link to='menu'>Menu</Link></Menu.Item>
          <Menu.Item icon={<LaptopOutlined />} ><Link to='table'>Table</Link></Menu.Item>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Content><Outlet/></Content>
    </Layout>
  </Layout>
  );
};

export default AdminLayout;
