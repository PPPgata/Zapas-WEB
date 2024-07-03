import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import st from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import teamWork from "../../assets/img/Team_work.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import ButtonBack from "../../Components/ButtonBack/ButtonBack";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
    })
      .then((response) => {
        console.log(response);
        if (response.data.msg === "Login realizado com sucesso!") {
          navigate("/estoques");
        } else {
          setLoginError(response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        setLoginError("Erro ao realizar login. Tente novamente mais tarde.");
      });
  };

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
    <div className={st.content}>
      <div className={st.welcome}>
        <h1>Bem vindo!</h1>
        <img src={teamWork} alt="Pessoas carregando blocos de brinquedo" />
      </div>
      <div className={st.form}>
        <div className={st.headerForm}>
          <ButtonBack />
          <h1>Login</h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          {({ errors, touched }) => (
            <Form className={st.login_form}>
              <div className="login-group">
                <Field
                  name="email"
                  className={`${st.form_field} ${
                    errors.email && touched.email ? st.form_field_error : ""
                  }`}
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={st.form_error}
                />
              </div>
              <div className="login-group">
                <Field
                  name="password"
                  className={`${st.form_field} ${
                    errors.password && touched.password
                      ? st.form_field_error
                      : ""
                  }`}
                  placeholder="Senha"
                  type="password"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={st.form_error}
                />
              </div>
              {loginError && (
                <div className={st.error_message}>{loginError}</div>
              )}
              <div className={st.links}>
                <p>
                  Não tem cadastro?{" "}
                  <Link className={st.link} to={"/cadastro"}>
                    Cadastre-se
                  </Link>
                </p>
                <p>
                  <Link className={st.link} to={"/esqueceuSenha"}>
                    Esqueceu sua senha?
                  </Link>
                </p>
              </div>
              <button className={st.button} type="submit">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
