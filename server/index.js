const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "zapasbd",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const nome = req.body.nome;
  const segmento = req.body.segmento;
  const cnpj = req.body.cnpj;

  db.query("SELECT * FROM empresas WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      db.query(
        "INSERT INTO empresas (email, senha, nome, segmento, cnpj) VALUES (?, ?, ?, ?, ?)",
        [email, senha, nome, segmento, cnpj],
        (err, response) => {
          if (err) {
            res.send(err);
          }

          res.send({ msg: "Cadastro realizado com sucesso!" });
        }
      );
    } else {
      res.send({ msg: "Email já cadastrado!" });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  db.query(
    "SELECT * FROM empresas WHERE email = ? AND senha = ?",
    [email, senha],
    
    (err, result) => {
      if (err) {
        console.error("Erro na consulta SQL:", err);
        res.status(500).send(err); // Erro interno do servidor
        return;
      }

      if (result.length > 0) {
        res.send({ msg: "Login realizado com sucesso!" });
      } else {
        res.send({ msg: "Email ou senha incorretos!" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
