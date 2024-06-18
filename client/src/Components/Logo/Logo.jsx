import React from 'react'
import st from "./Logo.module.css";
import logo from "../../assets/img/Logo.svg";

const Logo = () => {
  return (
    <div>
      <img className={st.logo} src={logo} alt="Logo Zapas" />
    </div>
  )
}

export default Logo
