import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import st from './Users.module.css'
import { Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Search } = Input;

const Users = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={st.window}>
      <SideBar />
      <div className={st.container}>
        <div className={st.content}>
          <div className={st.header}>
            <div className={st.leftHeader}>
              <h1 className={st.title}>Funcionários / Fornecedores</h1>
              <Search placeholder="Pesquisar" style={{ width: 250 }} />
            </div>
            <Button
              className={st.buttonAdd}
              type="primary"
              onClick={() => setOpen(true)}
            >
              <PlusOutlined /> Adicionar Funcionários / Fornecedores
            </Button>
          </div>
          <table className={st.table}>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Responsável</th>
              <th>Opções</th>
            </tr>
          </thead>
          
          <tbody>
            <tr>
              <td>123.456.789-10</td>
              <td>Felipe</td>
              <td>Caixa</td>
              <td>Funcionário</td>
              <td>Editar/Excluir</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default Users
