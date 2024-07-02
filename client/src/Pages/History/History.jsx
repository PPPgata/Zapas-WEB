import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./History.module.css";
import { useEffect } from "react";
import Axios from "axios";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const History = () => {
  const [listHistory, setListHistory] = React.useState([]);
  const [listColaborators, setListColaborators] = React.useState([]);
  const [listItens, setListItens] = React.useState([]);
  const [listStock, setListStock] = React.useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3001/getHistory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListHistory(response.data);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3001/getColaborators", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListColaborators(response.data);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3001/getItens", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListItens(response.data);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3001/getCards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListStock(response.data);
    });
  }, []);

  return (
    <div className={st.window}>
      <SideBar />
      <div className={st.container}>
        <div className={st.content}>
          <div className={st.header}>
            <h1 className={st.title}>Histórico</h1>
          </div>
          <table className={st.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Responsável</th>
                <th>Data/Hora</th>
              </tr>
            </thead>
            <tbody>
              {listHistory.map((val) => {
                const dataFormatada = format(new Date(val.dia), 'dd/MM/yyyy HH:mm', { locale: ptBR });
                console.log(val.id_colaborador);

                return (
                  <tr>
                    <td>{val.nome_transacao}</td>
                    <td>{val.descricao}</td>
                    <td>{val.responsavel}</td>
                    <td>{dataFormatada}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
