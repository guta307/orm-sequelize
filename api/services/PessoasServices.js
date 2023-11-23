const Services = require("./Services");
const database = require("../models");
class pessoasServices extends Services {
  //Herdando métodos de Services
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  //métodos específifcos do controlador de Pessoas

  async pegaRegistrosAtivos(where = {}) {
    return database[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async pegaTodosOsRegistros(where = {}) {
    return database[this.nomeDoModelo]
      .scope("todos")
      .findAll({ where: { ...where } });
  }

  async cancelaPessoasEMatriculas(estudanteId) {
    return database.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro({ ativo: false }, estudanteId, {
        transaction: transacao,
      });
      await this.matriculas.atualizaRegistros(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        {
          transaction: transacao,
        }
      );
    });
  }
}

module.exports = pessoasServices;
