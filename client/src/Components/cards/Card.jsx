import React from "react";
import st from "./Card.module.css";

const Cards = () => {
  return (
    <div className={st.card}>
      <header className={st.headerCard}>
        <p>Nome: nome</p>
      </header>
      <div className={st.bodyCard}>
        <p>Quantidade: quantidade</p>
        <p>Categoria: categoria</p>
        <p>Localização: local </p>
      </div>
    </div>
  );
};

export default Cards;
