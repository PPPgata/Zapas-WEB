import React, { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import st from "./Stock.module.css";
import { Button, Modal } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import * as yup from "yup";

const Stock = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", space: "", category: "", localization: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  const handleClickStock = (values, resetForm) => {
    setIsSubmitting(true);
    Axios.post("http://localhost:3001/estoques", {
      name: values.name,
      space: values.space,
      category: values.category,
      localization: values.localization,
      token: token
    })
      .then((response) => {
        console.log(response);
        setIsSubmitting(false);
        setOpen(false);
        resetForm();
        setFormValues({ name: "", space: "", category: "", localization: "" });
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
      });
  };

  const validationStock = yup.object().shape({
    name: yup.string().required("Este campo é obrigatório"),
    space: yup.number().required("Este campo é obrigatório"),
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
            onClick={() => {
              setFormValues({ name: "", space: "", category: "", localization: "" });
              setOpen(true);
            }}
          >
            Adicionar Item
          </Button>
          <Modal
            className={st.modal}
            title="Criando seu estoque"
            centered
            open={open}
            onOk={() => {
              validationStock
                .validate(formValues)
                .then((valid) => {
                  if (valid) {
                    handleClickStock(formValues, () => {});
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
            onCancel={() => setOpen(false)}
            confirmLoading={isSubmitting}
            width={1000}
            style={{ backgroundColor: "#263238" }}
          >
            <Formik
              initialValues={formValues}
              enableReinitialize
              onSubmit={(values, { resetForm }) => {
                validationStock
                  .validate(values)
                  .then((valid) => {
                    if (valid) {
                      handleClickStock(values, resetForm);
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
              validationSchema={validationStock}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form className={st.login_form}>
                  <div className={st.login_group}>
                    <Field
                      name="name"
                      placeholder="Nome do estoque"
                      className={`${st.form_field} ${errors.name && touched.name ? st.form_field_error : ""}`}
                      onChange={(e) => {
                        handleChange(e);
                        setFormValues({ ...values, name: e.target.value });
                      }}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <ErrorMessage name="name" component="span" className={st.form_error} />
                  </div>
                  <div className={st.login_group}>
                    <Field
                      name="space"
                      placeholder="Espaço disponível"
                      type="number"
                      className={`${st.form_field} ${errors.space && touched.space ? st.form_field_error : ""}`}
                      onChange={(e) => {
                        handleChange(e);
                        setFormValues({ ...values, space: e.target.value });
                      }}
                      onBlur={handleBlur}
                      value={values.space}
                    />
                    <ErrorMessage name="space" component="span" className={st.form_error} />
                  </div>
                  <div className={st.login_group}>
                    <Field
                      name="category"
                      placeholder="Categoria"
                      className={`${st.form_field} ${errors.category && touched.category ? st.form_field_error : ""}`}
                      onChange={(e) => {
                        handleChange(e);
                        setFormValues({ ...values, category: e.target.value });
                      }}
                      onBlur={handleBlur}
                      value={values.category}
                    />
                    <ErrorMessage name="category" component="span" className={st.form_error} />
                  </div>
                  <div className={st.login_group}>
                    <Field
                      name="localization"
                      placeholder="Localização"
                      className={`${st.form_field} ${errors.localization && touched.localization ? st.form_field_error : ""}`}
                      onChange={(e) => {
                        handleChange(e);
                        setFormValues({ ...values, localization: e.target.value });
                      }}
                      onBlur={handleBlur}
                      value={values.localization}
                    />
                    <ErrorMessage name="localization" component="span" className={st.form_error} />
                  </div>
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
