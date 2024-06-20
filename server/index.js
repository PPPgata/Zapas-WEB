const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "zapas",
});

app.get("/", (req, res) => {
  db.query(
    "INSERT INTO empresas (email, password, enterprise_name, industry, cnpj) VALUES ('rafaelleivas@gmail.com', '123456', 'Zapas', 'Tecnologia', '12312312312312')"
  );
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
