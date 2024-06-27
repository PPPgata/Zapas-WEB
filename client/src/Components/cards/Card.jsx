import React from "react";
import { Card as AntCard } from "antd";
import st from "./Card.module.css";
import { HddOutlined } from "@ant-design/icons";

const handleClickExcluir = (id) => {
  console.log("Excluir", id);
};

const Card = ({ name, quantidade, categoria, local, deleteIcon, editIcon }) => {
  return (
    <AntCard className={st.card}>
      <div className={st.headerCard}>
        <h1 className={st.title}>{name}</h1>
        <div className={st.iconContainer}>
          {editIcon}
          {deleteIcon}
        </div>
      </div>
      <div className={st.bodyCard}>
        <HddOutlined style={{ fontSize: "50px", color: "#08c" }} />
        <div>
          <p><strong> N/ Itens </strong> <br /> {quantidade}</p>
          <p><strong>Categoria</strong> <br /> {categoria}</p>
        </div>
      </div>
      <p><strong> Onde fica </strong> <br /> {local}</p>
      
    </AntCard>
  );
};

export default Card;
