import React, { useState } from "react";
import st from "./SideBar.module.css";
import { Layout } from "antd";
import Logo from "../Logo/Logo";
import MenuList from "../MenuList/MenuList";
import SmallLogo from '../SmallLogo/SmallLogo';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  return (
    <>
      <Layout>
        <Sider
          className={st.sidebar}
          width={250}
          collapsedWidth={80}
          collapsed={collapsed}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ backgroundColor: "#002249", transition: 'all 0.3s' }}
        >
          {collapsed ? <SmallLogo /> : <Logo className={st.logo} />}
          <MenuList />
        </Sider>
      </Layout>
    </>
  );
};

export default SideBar;
