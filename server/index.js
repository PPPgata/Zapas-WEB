const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const SECRET = "secretkey";

const bcrypt = require("bcrypt");
const saltRounds = 10;

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
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO empresas (email, senha, nome, segmento, cnpj) VALUES (?, ?, ?, ?, ?)",
          [email, hash, nome, segmento, cnpj],
          (err, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Cadastro realizado com sucesso!" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado!" });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  db.query(
    "SELECT * FROM empresas WHERE email = ?",
    [email],

    (err, result) => {
      if (err) {
        console.error("Erro na consulta SQL:", err);
        res.status(500).send(err);
        return;
      }

      if (result.length > 0) {
        bcrypt.compare(senha, result[0].senha, (error, result) => {
          if (result) {
            const token = jwt.sign({ email: email }, SECRET, { expiresIn: "1h" });
            res.send({ msg: "Login realizado com sucesso!" });
          } else {
            res.send({ msg: "A senha está incorreto!" });
          }
        });
      } else {
        res.send({ msg: "O email esta incorreto!" });
      }
    }
  );
});

app.post("/estoques", (req, res) => {
  const name = req.body.name;
  const space = req.body.space;
  const category = req.body.category;
  const localization = req.body.localization;
  const empresa_id = 16;

  db.query("SELECT * FROM estoques WHERE name = ?", [name], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg: "Erro ao buscar estoques" });
    } else if (results.length > 0) {
      res.send({ msg: "Estoque já cadastrado!" });
    } else {
      db.query(
        "INSERT INTO estoques (name, space, category, localization, empresa_id) VALUES (?, ?, ?, ?, ?)",
        [name, space, category, localization, empresa_id],
        (err, insertResult) => {
          if (err) {
            console.log(err);
            res.status(500).send({ msg: "Erro ao inserir estoque" });
          } else {
            db.query("SELECT * FROM estoques", (err, allEstoques) => {
              if (err) {
                console.log(err);
                res.status(500).send({ msg: "Erro ao buscar todos os estoques" });
              } else {
                res.send(allEstoques);
              }
            });
          }
        }
      );
    }
  });
});


app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
