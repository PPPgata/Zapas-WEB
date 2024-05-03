import React from 'react'
import st from './Header.module.css'
import logo from '../../assets/img/Logo.svg'

const Header = () => {
  return (
    <div>
      <header className={st.header}>
        <img src={logo} alt="Logo Zapas" />
      </header>
    </div>
  )
}

export default Header
