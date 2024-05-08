import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import st from "./Home.module.css"
import ButtonLogin from '../../Components/Button Login/ButtonLogin'

const Home = () => {
  return (
    <>
      <div className={st.fundoSection_1}>
        <header>
          <NavBar />
        </header>
        <main>

          <div>
            <h2>SISTEMA DE ESTOQUE</h2>
            <h2>ZAPAS</h2>
            <h1>Controle seu estoque com facilidade!</h1>
            <span>Otimize seu estoque com nossa Implantação de Sistema de Estoque. Acesso remoto e alertas de baixo estoque inclusos!</span>
            <ButtonLogin name={ "Cadastre-se" } link={"#"}/>
          </div>

        </main>
      </div>
    </>
  )
}

export default Home
