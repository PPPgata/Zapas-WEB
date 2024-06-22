import React from "react";
import st from "./ButtonBack.module.css";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ButtonBack = () => {
  return (
    <div>
      <Link to="/" className={st.link}>
        <span>
          <ArrowLeftOutlined style={{ fontSize: "15px" }} /> Voltar
        </span>
      </Link>
    </div>
  );
};

export default ButtonBack;
