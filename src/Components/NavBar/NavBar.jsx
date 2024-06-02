import React from 'react'
import st from './NavBar.module.css'
import logo from '../../assets/img/Logo.svg'
import ButtonLogin from '../Button Login/ButtonLogin'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className={st.items}>
        <img className={st.logo} src={logo} alt="Logo Zapas" />
        <ul className={st.nav_buttons}>
          <li className={st.nav_signUp}><Link to="/cadastro">Cadastre-se</Link></li>
          <li className={st.nav_signUp}><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
