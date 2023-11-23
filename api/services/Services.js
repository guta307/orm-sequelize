const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros() {
    return database[this.nomeDoModelo].findAll();
  }

  async pegaUmRegistro() {}

  async criaRegistro() {}

  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return database[this.nomeDoModelo].update(dadosAtualizados, {
      where: { id },
      transacao,
    });
  }

  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return database[this.nomeDoModelo].update(dadosAtualizados, {
      where: { ...where },
      transacao,
    });
  }
}

module.exports = Services;
