import React, { useState } from "react";
import st from "../SideBar/SideBar.module.css";
import { Layout } from "antd";
import Logo from "../Logo/Logo";
import MenuList from "../MenuList/MenuList";
import SmallLogo from '../SmallLogo/SmallLogo';

const { Header, Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Layout>
        <Sider
          className={st.sidebar}
          width={250}
          collapsedWidth={80}
          collapsed={collapsed}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
          style={{ backgroundColor: "#002249", transition: 'all 0.3s' }}
        >
          {collapsed ? <SmallLogo /> : <Logo className={st.logo} />}
          <MenuList />
          {/* Adicionar o elemento da faixa */}
          {!collapsed && <div className={st.rightStripe}></div>}
        </Sider>
      </Layout>
    </>
  );
};

export default SideBar;
