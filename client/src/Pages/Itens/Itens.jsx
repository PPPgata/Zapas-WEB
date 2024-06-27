import React from "react";
import { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./Itens.module.css";
import { Input, Space, Button, Modal, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

const Itens = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={st.window}>
      <SideBar />
      <div className={st.container}>
        <div className={st.content}>
          <div className={st.header}>
            <div className={st.leftHeader}>
              <h1 className={st.title}>Itens disponíveis</h1>
              <Search placeholder="Pesquisar" style={{ width: 250 }} />
            </div>
            <Button
              className={st.buttonAdd}
              type="primary"
              onClick={() => setOpen(true)}
            >
              <PlusOutlined /> Adicionar produto
            </Button>
          </div>
          <table className={st.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Custo</th>
              <th>Valor</th>
              <th>Estoque</th>
              <th>Total</th>
              <th>Botao</th>
            </tr>
          </thead>
          
          <tbody>
            <tr>
              <td>1</td>
              <td>Produto 1</td>
              <td>Alimento</td>
              <td>10</td>
              <td>20</td>
              <td>10</td>
              <td>200</td>
              <td>Editar</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Itens;
