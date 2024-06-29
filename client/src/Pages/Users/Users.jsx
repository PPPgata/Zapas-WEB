import React, { useState, useEffect } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./Users.module.css";
import { Input, Button, Modal } from "antd";
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";

const { Search } = Input;
const { confirm } = Modal;

const Users = () => {
  const [open, setOpen] = React.useState(false);
  const [listColaborators, setListColaborators] = useState([]);
  const [search, setSearch] = useState("");

  const validationUser = yup.object().shape({
    cpf: yup.string().required("Campo obrigatório"),
    name: yup.string().required("Campo obrigatório"),
    cargo: yup.string().required("Campo obrigatório"),
    responsavel: yup.string().required("Campo obrigatório"),
  });

  const initialValues = {
    cpf: "",
    name: "",
    cargo: "",
    responsavel: "",
  };

  const handleClick = (values, resetForm) => {
    const token = localStorage.getItem("token");

    Axios.post("http://localhost:3001/registercolaborator", {
      cpf: values.cpf,
      name: values.name,
      cargo: values.cargo,
      responsavel: values.responsavel,
      token: token,
    }).then((response) => {
      console.log(response.data);
      resetForm();
      setOpen(false);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3001/getColaborators", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setListColaborators(response.data);
    });
  }, [handleClick]);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Você tem certeza que deseja deletar esse colaborador?",
      icon: <ExclamationCircleOutlined />,
      content: "Esse colaborador será deletado permanentemente.",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    Axios.delete(`http://localhost:3001/deleteColaborator/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // console.log(response.data);
    });
  };

  const handleEdit = (id) => {
    const token = localStorage.getItem("token");

    Axios.put(`http://localhost:3001/editColaborator/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className={st.window}>
      <SideBar />
      <div className={st.container}>
        <div className={st.content}>
          <div className={st.header}>
            <div className={st.leftHeader}>
              <h1 className={st.title}>Funcionários / Fornecedores</h1>
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
              onClick={() => setOpen(true)}
            >
              <PlusOutlined /> Adicionar Funcionários / Fornecedores
            </Button>
            <Modal
              title="Adicionar Funcionários / Fornecedores"
              className={st.modal}
              visible={open}
              onCancel={() => setOpen(false)}
              footer={null}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationUser}
                onSubmit={(values, { resetForm }) => {
                  handleClick(values, resetForm);
                }}
              >
                {({ handleSubmit, handleChange, handleBlur, values }) => (
                  <Form>
                    <div className={st.form}>
                      <label>CPF</label>
                      <Field
                        name="cpf"
                        type="text"
                        className={st.input}
                        placeholder="Digite o CPF"
                      />
                      <ErrorMessage name="cpf" component="span" />
                    </div>
                    <div className={st.form}>
                      <label>Nome</label>
                      <Field
                        name="name"
                        type="text"
                        className={st.input}
                        placeholder="Digite o nome"
                      />
                      <ErrorMessage name="name" component="span" />
                    </div>
                    <div className={st.form}>
                      <label>Cargo</label>
                      <Field
                        name="cargo"
                        type="text"
                        className={st.input}
                        placeholder="Digite o cargo"
                      />
                      <ErrorMessage name="cargo" component="span" />
                    </div>
                    <div className={st.form}>
                      <label>Responsável</label>
                      <Field
                        name="responsavel"
                        type="text"
                        className={st.input}
                        placeholder="Digite o responsável"
                      />
                      <ErrorMessage name="responsavel" component="span" />
                    </div>
                    <Button
                      type="primary"
                      onClick={handleSubmit}
                      className={st.buttonModal}
                    >
                      Adicionar
                    </Button>
                  </Form>
                )}
              </Formik>
            </Modal>
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
              {listColaborators
                .filter((value) => {
                  if (search === "") {
                    return value;
                  } else if (
                    value.cpf.toLowerCase().includes(search.toLowerCase()) ||
                    value.nome.toLowerCase().includes(search.toLowerCase()) ||
                    value.cargo.toLowerCase().includes(search.toLowerCase()) ||
                    value.responsavel
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value) => (
                  <tr key={value.id}>
                    <td>{value.cpf}</td>
                    <td>{value.nome}</td>
                    <td>{value.cargo}</td>
                    <td>{value.responsavel}</td>
                    <td className={st.buttonsActions}>
                      <EditOutlined
                        className={st.editIcon}
                        style={{ fontSize: "20px" }}
                        onClick={() => handleEdit(value.id)}
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

export default Users;
