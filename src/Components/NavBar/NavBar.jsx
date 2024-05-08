import React from 'react'
import st from './NavBar.module.css'
import logo from '../../assets/img/Logo.svg'

const NavBar = () => {
  return (
    <div>
      <div className={st.items}>
        <img className={st.logo} src={logo} alt="Logo Zapas" />
        <ul className={st.nav_buttons}>
          <li className={st.nav_signUp}><a  href="#">Cadastre-se</a></li>
          <li className={st.nav_login}><a  href="#">Entrar</a></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
