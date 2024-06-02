import React from "react";
import st from "../Cadastro/Cadastro.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const Cadastro = () => {
  const handleClickRegister = (values) => console.log(values);

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter 6 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não são iguais")
      .required("Este campo é obrigatório"),
    enterpriseName: yup
      .string()
      .required("Este campo é obrigatório"),
    enterpriseSegment: yup
      .string()
      .required("Este campo é obrigatório"),
    cnpj: yup
      .string()
      .min(14, "O CNPJ deve ter 14 caracteres")
      .max(14, "O CNPJ deve ter 14 caracteres")
      .required("Este campo é obrigatório"),
  });

  return (
    <>
      <div className={st.container}>
        <h1>Cadastre - se</h1>
        <Formik
          initialValues={{ }}
          onSubmit={handleClickRegister}
          validationSchema={validationRegister}
        >
          <Form className="signUp-form">
            <div className="signUp-group">
              <Field name="email" className="form-field" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="span"
                className="form-error"
              />
            </div>
            <div className="signUp-group">
              <Field
                name="password"
                className="form-field"
                placeholder="Senha"
                type="password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="form-error"
              />
            </div>
            <div className="signUp-group">
              <Field
                name="confirmPassword"
                className="form-field"
                placeholder="Confirme sua senha"
                type="password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className="form-error"
              />
            </div>
            <button className="button" type="submit">
              Continue o registro
            </button>
            <div className="signUp-group">
              <Field
                name="enterpriseName"
                className="form-field"
                placeholder="Nome da sua empresa"
              />
              <ErrorMessage
                name="enterpriseName"
                component="span"
                className="form-error"
              />
            </div>
            <div className="signUp-group">
              <Field
                name="enterpriseSegment"
                className="form-field"
                placeholder="Qual seu segmento"
              />
              <ErrorMessage
                name="enterpriseSegment"
                component="span"
                className="form-error"
              />
            </div>
            <div className="signUp-group">
              <Field
                name="cnpj"
                className="form-field"
                placeholder="CNPJ"
                type="number"
              />
              <ErrorMessage
                name="cnpj"
                component="span"
                className="form-error"
              />
            </div>
            <button>
              Registre - se
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Cadastro;
