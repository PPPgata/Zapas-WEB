import React from 'react'
import st from './NavBar.module.css'
import logo from '../../assets/img/Logo.svg'
import ButtonLogin from '../Button Login/ButtonLogin'

const NavBar = () => {
  return (
    <div>
      <div className={st.items}>
        <img className={st.logo} src={logo} alt="Logo Zapas" />
        <ul className={st.nav_buttons}>
          <li className={st.nav_signUp}><a  href="#">Cadastre-se</a></li>
          <li><ButtonLogin name={ "Login" } link={"https://www.instagram.com/rafae_bl/"}/></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
