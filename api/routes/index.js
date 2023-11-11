const bodyParser = require("body-parser");
const pessoas = require("./pessoasRoute");
//adicionamos as rotas de niveis e turmas
const niveis = require("./niveisRoute");
const turmas = require("./turmasRoute");

module.exports = (app) => {
  app.use(bodyParser.json()); // indica para o express que terá uma  biblioteca que fará o "meio de campo" entre as requisições e o express
  app.use(pessoas, niveis, turmas);
  app.get("/", (req, res) => res.status(200).send("Olá"));
};
