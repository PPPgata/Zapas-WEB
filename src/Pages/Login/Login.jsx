import React from "react";
import st from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const Login = () => {
  const handleClickLogin = (values) => console.log(values);

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter 6 caracteres")
      .required("Este campo é obrigatório"),
  });

  return (
    <>
      <div className={st.container}>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          <Form className="login-form">
            <div className="login-group">
              <Field name="email" className="form-field" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="span"
                className="form-error"
              />
            </div>
            <div className="login-group">
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
            <button className="button" type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
