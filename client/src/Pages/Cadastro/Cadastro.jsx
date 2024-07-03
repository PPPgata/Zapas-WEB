import React from "react";
import { useState } from "react";
import st from "../Cadastro/Cadastro.module.css";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import teamWork from "../../assets/img/Team_work.png";
import Axios from "axios";
import InputMask from "react-input-mask";
import ButtonBack from "../../Components/ButtonBack/ButtonBack";
import { Divider } from "antd";

const Cadastro = () => {
  const [CadastroError, setCadastroError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
    }).then((response) => {
      console.log(response);
      if (response.data.msg === "Cadastro realizado com sucesso!") {
        navigate("/login");
      } else {
        setCadastroError(response.data.msg);
      }
    });
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
      .min(18, "O CNPJ deve ter 14 caracteres")
      .max(18, "O CNPJ deve ter 14 caracteres")
      .required("Este campo é obrigatório"),
  });

  return (
    <div className={st.content}>
      <div className={st.form}>
        <div className={st.headerForm}>
          <ButtonBack />
          <h1>Cadastre-se</h1>
        </div>
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
          {({ errors, touched }) => (
            <Form className={st.signUp_form}>
              <div className={st.register_form}>
                <Field
                  name="email"
                  className={`${st.form_field} ${
                    touched.email && errors.email ? st.error : ""
                  }`}
                  placeholder="Email"
                />
                {touched.email && errors.email && (
                  <span className={st.form_error}>{errors.email}</span>
                )}
              </div>
              <div className={st.passwords}>
                <div className={st.register_form}>
                  <Field
                    name="password"
                    className={`${st.form_field} ${
                      touched.password && errors.password ? st.error : ""
                    }`}
                    placeholder="Senha"
                    type="password"
                  />
                  {touched.password && errors.password && (
                    <span className={st.form_error}>{errors.password}</span>
                  )}
                </div>
                <div className={st.register_form}>
                  <Field
                    name="confirmPassword"
                    className={`${st.form_field} ${
                      touched.confirmPassword && errors.confirmPassword
                        ? st.error
                        : ""
                    }`}
                    placeholder="Confirme sua senha"
                    type="password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <span className={st.form_error}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
              <div className={st.register_form}>
                <Field
                  name="enterpriseName"
                  className={`${st.form_field} ${
                    touched.enterpriseName && errors.enterpriseName
                      ? st.error
                      : ""
                  }`}
                  placeholder="Nome da sua empresa"
                />
                {touched.enterpriseName && errors.enterpriseName && (
                  <span className={st.form_error}>{errors.enterpriseName}</span>
                )}
              </div>
              <div className={st.enterprise}>
                <div className={st.register_form}>
                  <Field
                    name="enterpriseSegment"
                    className={`${st.form_field} ${
                      touched.enterpriseSegment && errors.enterpriseSegment
                        ? st.error
                        : ""
                    }`}
                    placeholder="Segmento"
                  />
                  {touched.enterpriseSegment && errors.enterpriseSegment && (
                    <span className={st.form_error}>
                      {errors.enterpriseSegment}
                    </span>
                  )}
                </div>
                <div className={st.register_form}>
                  <Field name="cnpj">
                    {({ field }) => (
                      <InputMask
                        {...field}
                        mask="99.999.999/9999-99"
                        className={`${st.form_field} ${
                          touched.cnpj && errors.cnpj ? st.error : ""
                        }`}
                        placeholder="CNPJ"
                      />
                    )}
                  </Field>
                  {touched.cnpj && errors.cnpj && (
                    <span className={st.form_error}>{errors.cnpj}</span>
                  )}
                </div>
              </div>
              <p className={st.register}>
                Já tem cadastro?{" "}
                <Link className={st.link} to="/login">
                  Login
                </Link>
              </p>
              <button
                className={st.button}
                type="submit"
                onClick={() => setFormSubmitted(true)}
              >
                Registre-se
              </button>
            </Form>
          )}
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
