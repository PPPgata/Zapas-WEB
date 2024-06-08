import React from 'react'
import st from "../SideBar/SideBar.module.css";
import { Layout } from "antd";
import Logo from '../Logo/Logo';

const {Header, Sider} = Layout;

const SideBar = () => {
  return (
    <>
      <Layout>
        <Sider className={st.sidebar} style={{ backgroundColor: '#0081A7' }}>
          <Logo />
        </Sider>
      </Layout>
    </>
  )
}

export default SideBar
