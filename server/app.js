const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zapasbd'
})

app.post("/register", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const nome = req.body.nome;
    const segmento = req.body.segmento;
    const cnpj = req.body.cnpj;
  
    db.query("SELECT * FROM empresas WHERE email = ?", [email], (err, result) => {
      if (err) {
        res.send(err);
        // if caso ocorra um erro
      }
      if (result.length == 0) {
        // if caso n ache nada
        bcrypt.hash(senha, saltRounds, (err, hash) => {
          db.query(
            "INSERT INTO empresas (email, senha, nome, segmento, cnpj) VALUES (?, ?, ?, ?, ?)",
            [email, hash, nome, segmento, cnpj],
            (err, response) => {
              if (err) {
                res.send(err);
                // caso de erro
              }
  
              res.send({ msg: "Cadastro realizado com sucesso!" });
              // cria o usuario
            }
          );
        });
      } else {
        res.send({ msg: "Email já cadastrado!" });
        // email ja cadastrado 
      }
    });
  });

db.connect( function (err) {
    console.log('Banco conectado')
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
  });