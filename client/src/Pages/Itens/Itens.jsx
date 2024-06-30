import React, { useState, useEffect } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./Itens.module.css";
import { Input, Button, Modal, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import InputMask from "react-input-mask";
import { FaRegTrashAlt } from "react-icons/fa";
import { EditOutlined } from "@ant-design/icons";

const { Search } = Input;

const Itens = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [listCards, setListCards] = useState([]);
  const [listItens, setListItens] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIten, setSelectedIten] = useState(null);

  const initialValues = {
    name: "",
    category: "",
    cost: "",
    price: "",
    stock: "",
    minimalUnit: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Campo obrigatório"),
    category: Yup.string().required("Campo obrigatório"),
    cost: Yup.string().required("Campo obrigatório"),
    price: Yup.string().required("Campo obrigatório"),
    stock: Yup.number().required("Campo obrigatório"),
    minimalUnit: Yup.number().required("Campo obrigatório"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3001/getCards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListCards(response.data);
    });
  }, []);

  const handleClickAddItem = (values, { resetForm }) => {
    const token = localStorage.getItem("token");

    const valorSemFormatacao = values.cost.replace("R$ ", "");
    const precoSemFormatacao = values.price.replace("R$ ", "");

    if (isEdit && selectedIten) {
      Axios.put(
        `http://localhost:3001/editItem/${selectedIten.id}`,
        {
          name: values.name,
          category: values.category,
          cost: valorSemFormatacao,
          price: precoSemFormatacao,
          stock: values.stock,
          minimalUnit: values.minimalUnit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        console.log(response.data);
        resetForm();
        setOpen(false);
        setIsEdit(false);
        setSelectedIten(null);
        notification.success({
          message: "Produto editado com sucesso",
          description: "O produto foi editado com sucesso",
          placement: "bottomRight",
          duration: 3,
        });
      });
    } else {
      Axios.post(
        "http://localhost:3001/registerproduct",
        {
          name: values.name,
          category: values.category,
          cost: valorSemFormatacao,
          price: precoSemFormatacao,
          stock: values.stock,
          minimalUnit: values.minimalUnit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        console.log(response.data);
        resetForm();
        setOpen(false);
        notification.success({
          message: "Produto cadastrado com sucesso",
          description: "O produto foi cadastrado com sucesso",
          placement: "bottomRight",
          duration: 3,
        });
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3001/getItens", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListItens(response.data);
    });
  }, [handleClickAddItem]);

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Deseja deletar esse produto?",
      content: "Ao deletar, não será possível recuperar o produto",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        handleClickDeleteItem(id);
      },
    });
  };

  const handleClickDeleteItem = (id) => {
    const token = localStorage.getItem("token");

    Axios.delete(`http://localhost:3001/deleteItem/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      notification.success({
        message: "Produto deletado com sucesso",
        description: "O produto foi deletado com sucesso",
        placement: "bottomRight",
        duration: 3,
        icon: <FaRegTrashAlt style={{ fontSize: "20px", color: "red" }} />,
      });
    });
  };

  const handleEditItem = (value) => {
    setSelectedIten(value);
    setIsEdit(true);
    setOpen(true);
  };

  return (
    <div className={st.window}>
      <SideBar />
      <div className={st.container}>
        <div className={st.content}>
          <div className={st.header}>
            <div className={st.leftHeader}>
              <h1 className={st.title}>Itens disponíveis</h1>
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Pesquisar"
                value={search}
                style={{ width: 250 }}
              />
            </div>
            <Button
              className={st.buttonAdd}
              type="primary"
              onClick={() => {
                setIsEdit(false);
                setSelectedIten(null);
                setOpen(true);
              }}
            >
              <PlusOutlined /> Adicionar produto
            </Button>

            <Modal
              title={isEdit ? "Editar produto" : "Adicionar produto"}
              visible={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              footer={null}
            >
              <Formik
                initialValues={selectedIten || initialValues}
                validationSchema={validationSchema}
                onSubmit={handleClickAddItem}
                enableReinitialize
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className={st.form}>
                      <label>Nome</label>
                      <Field
                        name="name"
                        className={st.input}
                        placeholder="Nome do produto"
                      />
                      <ErrorMessage name="name" component="div" />
                    </div>
                    <div className={st.form}>
                      <label>Categoria</label>
                      <Field
                        name="category"
                        className={st.input}
                        placeholder="Categoria do produto"
                      />
                      <ErrorMessage name="category" component="div" />
                    </div>
                    <div className={st.form}>
                      <label>Custo</label>
                      <Field name="cost">
                        {({ field }) => (
                          <InputMask
                            {...field}
                            mask="R$ 99.99"
                            maskChar={null}
                            className={st.input}
                            placeholder="Custo do produto"
                          />
                        )}
                      </Field>
                      <ErrorMessage name="cost" component="div" />
                    </div>
                    <div className={st.form}>
                      <label>Valor</label>
                      <Field name="price">
                        {({ field }) => (
                          <InputMask
                            {...field}
                            mask="R$ 99.99"
                            maskChar={null}
                            className={st.input}
                            placeholder="Preço a ser vendido"
                          />
                        )}
                      </Field>
                      <ErrorMessage name="price" component="div" />
                    </div>
                    <div className={st.form}>
                      <label>Unidades mínimas</label>
                      <Field
                        name="minimalUnit"
                        className={st.input}
                        type="number"
                        placeholder="15 unidades mínimas"
                      />
                      <ErrorMessage name="minimalUnit" component="div" />
                    </div>
                    <div className={st.form}>
                      <label>Estoque</label>
                      <Field
                        as="select"
                        name="stock"
                        className={`${st.input} ${st.select}`}
                      >
                        <option
                          value=""
                          label="Selecione o estoque"
                          className={st.option}
                        />
                        {listCards.map((val) => (
                          <option
                            key={val.id}
                            value={val.id}
                            label={val.name}
                            className={st.option}
                          />
                        ))}
                      </Field>
                      <ErrorMessage name="stock" component="div" />
                    </div>
                    <div className={st.form}>
                      <Button
                        className={st.buttonModal}
                        type="primary"
                        htmlType="submit"
                      >
                        {isEdit ? "Atualizar" : "Adicionar"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Modal>
          </div>
          <table className={st.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Custo p/ uni</th>
                <th>Valor</th>
                <th>Estoque</th>
                <th>Total/uni</th>
                <th>Botao</th>
              </tr>
            </thead>

            <tbody>
              {listItens
                .filter((item) => {
                  if (search === "") {
                    return true;
                  } else {
                    return (
                      item.name.toLowerCase().includes(search.toLowerCase()) ||
                      item.category
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      item.stock
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    );
                  }
                })
                .map((value) => (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.category}</td>
                    <td>{value.cost}</td>
                    <td>{value.price}</td>
                    <td>
                      {listCards.map((card) =>
                        card.id === value.stock ? card.name : null
                      )}
                    </td>
                    <td>{value.minimalUnit}</td>
                    <td className={st.buttonsActions}>
                      <EditOutlined
                        className={st.editIcon}
                        style={{ fontSize: "20px" }}
                        onClick={() => handleEditItem(value)}
                      />
                      <FaRegTrashAlt
                        className={st.deleteIcon}
                        style={{ fontSize: "20px", marginLeft: "10px" }}
                        onClick={() => showDeleteConfirm(value.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Itens;
