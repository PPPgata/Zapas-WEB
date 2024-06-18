import React from 'react'
import st from "./SmallLogo.module.css";
import logo from "../../assets/img/LogoZ.svg";

const SmallLogo = () => {
  return (
    <div>
      <img className={st.logo} src={logo} alt="Logo Zapas" />
    </div>
  )
}

export default SmallLogo
