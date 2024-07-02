import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./Dashboard.module.css";
import { Button, notification, Modal } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { FaExclamationTriangle } from "react-icons/fa";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Dashboard = () => {
  const [listStock, setListStock] = useState([]);
  const [listItens, setListItens] = useState([]);
  const [listColaborators, setListColaborators] = useState([]);
  const [listHistory, setListHistory] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);

  const handleAddItem = (values, { resetForm }) => {
    const token = localStorage.getItem("token");
  
    Axios.put(
      `http://localhost:3001/addItemStock/${values.itemId}`,
      {
        newValue: values.quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      console.log(values);
      Axios.post(
        "http://localhost:3001/historico",
        {
          nome: "Adição de Item",
          responsavel: values.colaboradorId,
          descricao: `O item ${values.itemId} foi adicionado com a quantidade ${values.quantity} unidades.`,
          empresa_id: response.data.empresa_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(() => {
        resetForm();
        setOpenAdd(false);
        notification.success({
          message: "Item adicionado com sucesso",
          description: "O item foi adicionado ao estoque com sucesso",
          placement: "bottomRight",
          duration: 3,
        });
      }).catch((error) => {
        console.log("Erro ao adicionar ao histórico:", error);
      });
    }).catch((error) => {
      console.log("Erro ao adicionar item ao estoque:", error);
    });
  };
  
  const handleRemoveItem = (values, { resetForm }) => {
    console.log(values);
    const token = localStorage.getItem("token");
  
    Axios.put(
      `http://localhost:3001/removeItemStock/${values.itemId}`,
      {
        newValue: values.quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      console.log(values);
      
      Axios.post(
        "http://localhost:3001/historico",
        {
          nome: "Remoção de Item",
          responsavel: values.colaboradorId,
          descricao: `O item ${values.itemId} foi retirado com a quantidade ${values.quantity} unidades.`,
          empresa_id: response.data.empresa_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(() => {
        resetForm();
        setOpenRemove(false);
        notification.success({
          message: "Item removido com sucesso",
          description: "O item foi removido do estoque com sucesso",
          placement: "bottomRight",
          duration: 3,
        });
      }).catch((error) => {
        console.log("Erro ao adicionar ao histórico:", error);
      });
    }).catch((error) => {
      console.log("Erro ao remover item do estoque:", error);
    });
  };
  
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3001/getItens", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListItens(response.data);
    });
  }, [handleAddItem, handleRemoveItem]);

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

    Axios.get("http://localhost:3001/getHistory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListHistory(response.data);
    });
  }, [handleAddItem, handleRemoveItem]);

  const lowStockItems = listItens.filter(
    (item) => item.total < item.minimal_unit
  );

  return (
    <div className={st.window}>
      <SideBar />
      <div className={st.container}>
        <div className={st.content}>
          <h1 className={st.title}>Dashboard</h1>
          <div className={st.cardsContainer}>
            <div className={st.cardButtons}>
              <h2>Realizar transação</h2>
              <div className={st.buttonsTransacao}>
                <Button
                  type="primary"
                  danger
                  icon={<MinusOutlined />}
                  onClick={() => setOpenRemove(true)}
                >
                  Remover Item
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenAdd(true)}
                >
                  Adicionar Item
                </Button>
              </div>
            </div>

            <Modal
              title="Adicionar Item"
              visible={openAdd}
              onCancel={() => setOpenAdd(false)}
              footer={null}
            >
              <Formik
                initialValues={{ itemId: "", quantity: "" }}
                validationSchema={Yup.object({
                  itemId: Yup.string().required("Selecione um item"),
                  quantity: Yup.number().required("Campo obrigatório"),
                  colaboradorId: Yup.string().required("Selecione um colaborador"),
                })}
                onSubmit={handleAddItem}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className={st.form}>
                      <label>Item</label>
                      <Field as="select" name="itemId" className={`${st.input} ${st.select}`}>
                        <option value="" label="Selecione um item" />
                        {listItens.map((item) => (
                          <option key={item.id} value={item.name} label={item.name} />
                        ))}
                      </Field>
                      <ErrorMessage name="itemId" component="div" />
                    </div>

                    <div className={st.form}>
                      <label>Colaborador</label>
                      <Field as="select" name="colaboradorId" className={`${st.input} ${st.select}`}>
                        <option value="" label="Selecione um Colaborador" />
                        {listColaborators.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.nome} label={colaborador.nome} />
                        ))}
                      </Field>
                      <ErrorMessage name="colaboradorId" component="div" />
                    </div>
                    
                    <div className={st.form}>
                      <label>Quantidade</label>
                      <Field
                        name="quantity"
                        className={st.input}
                        type="number"
                        placeholder="Quantidade a adicionar"
                      />
                      <ErrorMessage name="quantity" component="div" />
                    </div>
                    <Button
                      className={st.buttonModal}
                      type="primary"
                      htmlType="submit"
                    >
                      Adicionar
                    </Button>
                  </Form>
                )}
              </Formik>
            </Modal>

            <Modal
              title="Remover Item"
              visible={openRemove}
              onCancel={() => setOpenRemove(false)}
              footer={null}
            >
              <Formik
                initialValues={{ itemId: "", quantity: "" }}
                validationSchema={Yup.object({
                  itemId: Yup.string().required("Selecione um item"),
                  quantity: Yup.number().required("Campo obrigatório"),
                  colaboradorId: Yup.string().required("Selecione um colaborador"),
                })}
                onSubmit={handleRemoveItem}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className={st.form}>
                      <label>Item</label>
                      <Field as="select" name="itemId" className={`${st.input} ${st.select}`}>
                        <option value="" label="Selecione um item" />
                        {listItens.map((item) => (
                          <option key={item.id} value={item.id} label={item.name} />
                        ))}
                      </Field>
                      <ErrorMessage name="itemId" component="div" />
                    </div>
                    <div className={st.form}>
                      <label>Colaborador</label>
                      <Field as="select" name="colaboradorId" className={`${st.input} ${st.select}`}>
                        <option value="" label="Selecione um Colaborador" />
                        {listColaborators.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.nome} label={colaborador.nome} />
                        ))}
                      </Field>
                      <ErrorMessage name="colaboradorId" component="div" />
                    </div>
                    <div className={st.form}>
                      <label>Quantidade</label>
                      <Field
                        name="quantity"
                        className={st.input}
                        type="number"
                        placeholder="Quantidade a remover"
                      />
                      <ErrorMessage name="quantity" component="div" />
                    </div>
                    <Button
                      className={st.buttonModal}
                      type="primary"
                      htmlType="submit"
                    >
                      Remover
                    </Button>
                  </Form>
                )}
              </Formik>
            </Modal>

            <div className={st.cardEstoqueBaixo}>
              <h2>
                Estoque baixo <FaExclamationTriangle className={st.iconWarning} />
              </h2>
              <div className={st.tableContainer}>
                <table className={st.table}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantidade</th>
                      <th>Valor min</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((values) => (
                      <tr key={values.id}>
                        <td>{values.name}</td>
                        <td className={st.lowStock}>{values.total}</td>
                        <td>{values.minimal_unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={st.cardsFooter}>
            <div className={st.lastAdd}>
              <h2>Histórico</h2>
              <div className={st.popularItems}>
                {listHistory.map((values) => (
                  <div className={st.item}>{values.nome_transacao} -- {values.descricao}</div>
                ))}
              </div>
            </div>
            <div className={st.cadastrados}>
              <div className={st.cardFooter}>
                <h2>Itens cadastrados</h2>
                <span>{listItens.length}</span>
              </div>
              <div className={st.cardFooter}>
                <h2>Estoques cadastrados</h2>
                <span>{listStock.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
