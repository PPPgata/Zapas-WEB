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

// inicializando as config



app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
             res.send({ msg: "Cadastro realizado com sucesso!" });
});

app.post("/login", (req, res) => {
            res.send({ msg: "Login realizado com sucesso!" });
});

app.post("/estoques", (req, res) => {
  console.log("Chegado no back")
});

app.get("/getCards", (req, res) => {
  console.log("Chegado no back")
});

app.delete("/deleteCard/:id", (req, res) => { 
  console.log("Chegado no back")
});

app.post("/registercolaborator", (req, res) => {
  console.log("Chegado no back")
});

app.delete("/deleteColaborator/:id", (req, res) => {
  console.log("Chegado no back")
});

app.post("/registerproduct", (req, res) => {
  console.log("Chegado no back")
});

app.get("/getItens", (req, res) => {
  console.log("Chegado no back")

});

app.delete("/deleteItem/:id", (req, res) => {
  console.log("Chegado no back")

});

app.put("/editItem/:id", (req, res) => {
  console.log("Chegado no back")

});

app.put("/addItemStock/:id", (req, res) => {
  console.log("Chegado no back")

});

app.put("/removeItemStock/:id", (req, res) => {
  console.log("Chegado no back")

});

app.post("/historico", (req, res) => {
  console.log("Chegado no back")
});


app.get("/getHistory", (req, res) => {
  console.log("Chegado no back")
  
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
