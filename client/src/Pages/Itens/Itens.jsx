import React from "react";
import { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./Itens.module.css";
import { Input, Space, Button, Modal } from "antd";

const { Search } = Input;

const Itens = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={st.window}>
      <SideBar />
      <div className={st.container}>
        <h1>Itens cadastrados</h1>
        <div className={st.actionsItens}>
          <Space direction="vertical">
            <Search
              placeholder="Pesquisar"
              onSearch={(value) => console.log(value)}
              enterButton
            />
          </Space>

          <Button type="primary" onClick={() => setOpen(true)}>
            Adicionar Item
          </Button>
          <Modal
            className={st.modal}
            title="Modal 1000px width"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            contentBg={263238}
          >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Itens;
