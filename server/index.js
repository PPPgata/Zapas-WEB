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
        bcrypt.compare(senha, result[0].senha, (error, response) => {
          if (response) {
            const id_empresa = result[0].idempresas;

            const token = jwt.sign(
              { email: email, id_empresa: id_empresa },
              SECRET,
              { expiresIn: "1h" }
            );
            console.log(id_empresa);
            res.send({ msg: "Login realizado com sucesso!", token: token });
            data: {
              token: token;
            }
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

  const token = req.body.token;

  if (!token) {
    res.status(401).send({ msg: "Token não informado" });
    return;
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ msg: "Token inválido" });
      return;
    }

    db.query(
      "INSERT INTO estoques (name, space, category, localization, empresa_id) VALUES (?, ?, ?, ?, ?)",
      [name, space, category, localization, decoded.id_empresa],
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
  });
});

app.get("/getCards", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    const userID = decoded.id_empresa;

    let SQL = "SELECT * FROM estoques WHERE empresa_id = ?";

    db.query(SQL, [userID], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });
});

app.delete("/deleteCard/:id", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    const userID = decoded.id_empresa;
    const cardID = req.params.id;

    let SQL = "DELETE FROM estoques WHERE id = ? AND empresa_id = ?";

    db.query(SQL, [cardID, userID], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });
});

app.put("/estoques/:id", (req, res) => {
  const { id } = req.params;
  const { name, space, category, localization } = req.body;

  db.query(
    "UPDATE estoques SET name = ?, space = ?, category = ?, localization = ? WHERE id = ?",
    [name, space, category, localization, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ msg: "Erro ao atualizar o estoque" });
      } else {
        res.send({ msg: "Estoque atualizado com sucesso" });
      }
    }
  );
});

app.post("/registercolaborator", (req, res) => {
  const { cpf, name, cargo, responsavel, id_empresa } = req.body;

  const token = req.body.token;

  if (!token) {
    res.status(401).send({ msg: "Token não informado" });
    return;
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ msg: "Token inválido" });
      return;
    }

    db.query(
      "INSERT INTO users (cpf, nome, cargo, responsavel, id_empresa) VALUES (?, ?, ?, ?, ?)",
      [cpf, name, cargo, responsavel, decoded.id_empresa],
      (err, insertResult) => {
        if (err) {
          console.log(err);
          res.status(500).send({ msg: "Erro ao inserir colaborador" });
        } else {
          db.query("SELECT * FROM users", (err, allColaboradores) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send({ msg: "Erro ao buscar todos os colaboradores" });
            } else {
              res.send(allColaboradores);
            }
          });
        }
      }
    );
  });
});

app.get("/getColaborators", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    const userID = decoded.id_empresa;

    let SQL = "SELECT * FROM users WHERE id_empresa = ?";

    db.query(SQL, [userID], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });
});

app.delete("/deleteColaborator/:id", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    const userID = decoded.id_empresa;
    const colaboratorID = req.params.id;

    let SQL = "DELETE FROM users WHERE id = ? AND id_empresa = ?";

    db.query(SQL, [colaboratorID, userID], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });
});

app.put("/editColaborator/:id", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    const userID = decoded.id_empresa;
    const colaboratorID = req.params.id;

    let SQL =
      "UPDATE users SET cpf = ?, nome = ?, cargo = ?, responsavel = ? WHERE id = ? AND id_empresa = ?";

    db.query(
      SQL,
      [
        req.body.cpf,
        req.body.name,
        req.body.cargo,
        req.body.responsavel,
        colaboratorID,
        userID,
      ],
      (err, result) => {
        if (err) console.log(err);
        else res.send(result);
      }
    );
  });
});

app.post("/registerproduct", (req, res) => {
  const { name, category, cost, price, stock, minimalUnit } = req.body;

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  if (!token) {
    res.status(401).send({ msg: "Token não informado" });
    return;
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ msg: "Token inválido" });
      return;
    }

    db.query(
      "INSERT INTO itens (name, category, cost, value, stock, total, minimal_unit, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, category, cost, price, stock, 0, minimalUnit, decoded.id_empresa],
      (err, insertResult) => {
        if (err) {
          console.log(err);
          res.status(500).send({ msg: "Erro ao inserir produto" });
        } else {
          db.query("SELECT * FROM itens", (err, allProducts) => {
            if (err) {
              console.log(err);
              res.status(500).send({ msg: "Erro ao buscar todos os produtos" });
            } else {
              res.send(allProducts);
            }
          });
        }
      }
    );
  });
});

app.get("/getItens", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    const userID = decoded.id_empresa;

    let SQL = "SELECT * FROM itens WHERE empresa_id = ?";

    db.query(SQL, [userID], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });
});

app.delete("/deleteItem/:id", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    const userID = decoded.id_empresa;
    const itenID = req.params.id;

    let SQL = "DELETE FROM itens WHERE id = ? AND empresa_id = ?";

    db.query(SQL, [itenID, userID], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });
});

app.put("/editItem/:id", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    const userID = decoded.id_empresa;
    const itenID = req.params.id;

    let SQL =
      "UPDATE itens SET name = ?, category = ?, cost = ?, value = ?, stock = ?, minimal_unit = ? WHERE id = ? AND empresa_id = ?";

    db.query(
      SQL,
      [
        req.body.name,
        req.body.category,
        req.body.cost,
        req.body.price,
        req.body.stock,
        req.body.minimalUnit,
        itenID,
        userID,
      ],
      (err, result) => {
        if (err) console.log(err);
        else res.send(result);
      }
    );
  });
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
