const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class TurmaController {
  //puxar todas as Turmas
  static async pegaTodasAsTurmas(req, res) {
    const { data_inicial, data_final } = req.query;

    const where = {};

    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const todasAsTurmas = await database.Turmas.findAll({ where });
      return res.status(200).json(todasAsTurmas);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //puxar uma Turma pelo id
  static async pegaUmaTurma(req, res) {
    const { id } = req.params;

    try {
      const umaTurma = await database.Turmas.findOne({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json(umaTurma);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //criar um registro
  static async criaTurma(req, res) {
    const novaTurma = req.body;

    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma);

      return res.status(200).json(novaTurmaCriada);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //atualizar um registro

  static async atualizaTurma(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Turmas.update(novasInfos, {
        where: {
          id: Number(id),
        },
      });
      const turmaAtualizada = await database.Turmas.findOne({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(turmaAtualizada);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //deletar registros

  static async apagaTurma(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.destroy({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({ mensagem: `id ${id} foi deletado` });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
}

module.exports = TurmaController;
