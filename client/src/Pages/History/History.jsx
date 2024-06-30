import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./History.module.css";
import { Input } from "antd";

const History = () => {
  return (
    <div className={st.window}>
      <SideBar />
      <div className={st.container}>
        <div className={st.content}>
          <div className={st.header}>
            <h1 className={st.title}>Histórioco</h1>
            <Input placeholder="Pesquisar" style={{ width: 250 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
