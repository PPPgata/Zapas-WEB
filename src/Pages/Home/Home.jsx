import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import st from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className={st.fundoSection_1}>
        <header>
          <NavBar />
        </header>
        <main>
          <div className={st.container_1}>
            <div className={st.textsContainer_1}>
              <h2>SISTEMA DE ESTOQUE</h2>
              <h2 className={st.textZapas}>ZAPAS</h2>
              <h1>Controle seu estoque com facilidade!</h1>
              <span>
                Otimize seu estoque com nossa Implantação de Sistema de Estoque.
                Acesso remoto e alertas de baixo estoque inclusos!
              </span>
              <a className={st.buttonCadastro} href="#">
                Cadastre-se
              </a>
            </div>

            <div className={st.itensForms}>
              <h2>Potencialize seu estoque com a Zapas!</h2>
              <p>
                Transforme sua gestão de estoque com eficiência. Solicite um
                orçamento personalizado e descubra como otimizar seus
                processos agora.
              </p>
              <ul>
                <li>
                  <input placeholder="Name" type="text" />
                </li>
                <li>
                  <input placeholder="E-mail " type="text" />
                </li>
                <li>
                  <input placeholder="Mensagem " type="text" />
                </li>
                <li>
                  <a className={st.buttonCadastro} href="#">
                  Enviar contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
