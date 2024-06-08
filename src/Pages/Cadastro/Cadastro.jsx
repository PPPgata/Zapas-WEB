import React from "react";
import st from "../Cadastro/Cadastro.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import teamWork from "../../assets/img/Team_work.png";

const Cadastro = () => {
  const navigate = useNavigate();

  const handleClickRegister = (values) => {
    console.log(values);
    navigate("/dashboard");
  };

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
    enterpriseName: yup.string().required("Este campo é obrigatório"),
    enterpriseSegment: yup.string().required("Este campo é obrigatório"),
    cnpj: yup
      .string()
      .min(14, "O CNPJ deve ter 14 caracteres")
      .max(14, "O CNPJ deve ter 14 caracteres")
      .required("Este campo é obrigatório"),
  });

  return (
    <div className={st.content}>
      <div className={st.form}>
        <h1>Cadastre-se</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            enterpriseName: "",
            enterpriseSegment: "",
            cnpj: "",
          }}
          onSubmit={handleClickRegister}
          validationSchema={validationRegister}
        >
          <Form className={st.signUp_form}>
            <div className={st.register_form}>
              <Field
                name="email"
                className={st.form_field}
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={st.form_error}
              />
            </div>
            <div className={st.passwords}>
              <div className={st.register_form}>
                <Field
                  name="password"
                  className={st.form_field}
                  placeholder="Senha"
                  type="password"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={st.form_error}
                />
              </div>
              <div className={st.register_form}>
                <Field
                  name="confirmPassword"
                  className={st.form_field}
                  placeholder="Confirme sua senha"
                  type="password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={st.form_error}
                />
              </div>
            </div>
            <div className={st.register_form}>
              <Field
                name="enterpriseName"
                className={st.form_field}
                placeholder="Nome da sua empresa"
              />
              <ErrorMessage
                name="enterpriseName"
                component="span"
                className={st.form_error}
              />
            </div>
            <div className={st.enterprise}>
              <div className={st.register_form}>
                <Field
                  name="enterpriseSegment"
                  className={st.form_field}
                  placeholder="Segmento"
                />
                <ErrorMessage
                  name="enterpriseSegment"
                  component="span"
                  className={st.form_error}
                />
              </div>
              <div className={st.register_form}>
                <Field
                  name="cnpj"
                  className={st.form_field}
                  placeholder="CNPJ"
                  type="number"
                />
                <ErrorMessage
                  name="cnpj"
                  component="span"
                  className={st.form_error}
                />
              </div>
            </div>
            <p className={st.register}>
              Já tem cadastro?{" "}
              <Link className={st.link} to="/login">
                Login
              </Link>
            </p>
            <button className={st.button} type="submit">
              Registre-se
            </button>
          </Form>
        </Formik>
      </div>
      <div className={st.welcome}>
        <h1>Bem vindo!</h1>
        <img src={teamWork} alt="Pessoas carregando blocos de brinquedo" />
      </div>
    </div>
  );
};

export default Cadastro;
