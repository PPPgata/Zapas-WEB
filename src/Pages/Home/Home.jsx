import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import st from "./Home.module.css";
import logo from "../../assets/img/Logo.svg";
import mulherEstoque from "../../assets/img/mulherEstoque.png";
import mapaBrasil from "../../assets/img/mapaBrasil.svg";

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
                orçamento personalizado e descubra como otimizar seus processos
                agora.
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

      <div className={st.controleEstoque}>
        <img src={mulherEstoque} alt="mulherEstoque" />
        <div className={st.texts_controle}>
          <h2 className={st.subtitle}>
            Disitoque: Controle seu estoque de qualquer lugar com alertas de
            baixo estoque!
          </h2>
          <p className={st.textSections}>
            Bem-vindo à Disitoque, sua solução completa em Sistema de Estoque!
            Com seis meses de experiência no mercado, nos destacamos por
            oferecer um serviço de excelência com acesso remoto e alertas de
            estoque baixo, garantindo que sua empresa esteja sempre um passo à
            frente. Nosso diferencial está em proporcionar uma implantação de
            sistema de estoque eficiente e personalizada, atendendo às
            necessidades específicas de cada cliente. Com atendimento em todo o
            Brasil, estamos prontos para ajudar sua empresa a otimizar seus
            processos de gestão de estoque, garantindo maior eficiência e
            controle. Conte com a Disitoque para impulsionar o crescimento do
            seu negócio e manter seus produtos sempre disponíveis para seus
            clientes.
          </p>
        </div>
      </div>

      {/* Adicionar elementos nos cards depois */}
      <div className={st.cards}></div>

      <div className={st.lastElement}>
        <div className={st.lastElement_Texts}>
          <h2 className={st.subtitle}>
            Controle seu estoque em qualquer lugar do Brasil com facilidade e
            praticidade!
          </h2>
          <p className={st.textSections}>
            Com atendimento em todo o Brasil, a Zapas leva soluções inovadoras
            em Sistema de Estoque para empresas de todos os cantos do país. Não
            importa onde você esteja, tenha acesso remoto e alertas de estoque
            baixo para gerenciar seu negócio de forma eficiente. Conte conosco
            para otimizar sua gestão!
          </p>
          <a className={st.buttonCadastro} href="#">
            Inicie de graça
          </a>
        </div>

        <img src={mapaBrasil} alt="Mapa do Brasil" />
      </div>

      <footer>
        <div className={st.contentFooter}>
          <img src={logo} alt="Logo Zapas" />
          <div className={st.contact}>
            <h2 className={st.subtitle}>CONTATO</h2>
            <p>contato@zapas.com.br</p>
            <p>+55 (49) 99999-9999</p>
          </div>
        </div>
        <p>
          © 2024 Zapas: Controle seu estoque de forma eficiente e remota!.
          Direitos reservados.
        </p>
      </footer>
    </>
  );
};

export default Home;
