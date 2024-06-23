import React, { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./Stock.module.css";
import { Button, Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import * as yup from "yup";

const Stock = () => {
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleClickRegister = (values) => {
    console.log(values);
  };

  const validationStock = yup.object().shape({
    name: yup.string().required("Este campo é obrigatório"),
    space: yup.string().required("Este campo é obrigatório"),
    category: yup.string().required("Este campo é obrigatório"),
    localization: yup.string().required("Este campo é obrigatório"),
  });

  return (
    <>
      <div className={st.window}>
        <SideBar />
        <div className={st.container}>
          <Button
            className={st.buttonModal}
            type="primary"
            onClick={() => setOpen(true)}
          >
            Adicionar Item
          </Button>
          <Modal
            className={st.modal}
            title="Criando seu estoque"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            style={{ backgroundColor: "#263238" }}
          >
            <Formik
              initialValues={{ name: "", space: "", category: "", localization: "" }}
              onSubmit={(values, { setSubmitting }) => {
                handleClickRegister(values);
                setSubmitting(false);
              }}
              validationSchema={validationStock}
            >
              {({ errors, touched }) => (
                <Form className={st.login_form}>
                  <div className={st.login_group}>
                    <Field
                      name="name"
                      placeholder="Nome do estoque"
                      className={`${st.form_field} ${errors.name && touched.name ? st.form_field_error : ""}`}
                    />
                    <ErrorMessage name="name" component="span" className={st.form_error} />
                  </div>
                  <div className={st.login_group}>
                    <Field
                      name="space"
                      placeholder="Espaço disponível"
                      className={`${st.form_field} ${errors.space && touched.space ? st.form_field_error : ""}`}
                    />
                    <ErrorMessage name="space" component="span" className={st.form_error} />
                  </div>
                  <div className={st.login_group}>
                    <Field
                      name="category"
                      placeholder="Categoria"
                      className={`${st.form_field} ${errors.category && touched.category ? st.form_field_error : ""}`}
                    />
                    <ErrorMessage name="category" component="span" className={st.form_error} />
                  </div>
                  <div className={st.login_group}>
                    <Field
                      name="localization"
                      placeholder="Localização"
                      className={`${st.form_field} ${errors.localization && touched.localization ? st.form_field_error : ""}`}
                    />
                    <ErrorMessage name="localization" component="span" className={st.form_error} />
                  </div>
                  {loginError && (
                    <div className={st.error_message}>{loginError}</div>
                  )}
                  <button className={st.button} type="submit">
                    Enviar
                  </button>
                </Form>
              )}
            </Formik>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Stock;
