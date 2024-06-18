import React from 'react'
import st from './ButtonLogin.module.css'

const ButtonLogin = ( {name, link}) => {
  return (
    <>
      <a className={st.nav_login} href={link}>{name}</a>
    </>
  )
}

export default ButtonLogin
