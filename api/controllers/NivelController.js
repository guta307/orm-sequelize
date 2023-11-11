const database = require("../models");

class NivelController {
  //puxar todas as Niveis
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todasAsNiveis = await database.Niveis.findAll();
      return res.status(200).json(todasAsNiveis);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //puxar um Nivel pelo id
  static async pegaUmNivel(req, res) {
    const { id } = req.params;

    try {
      const umNivel = await database.Niveis.findOne({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json(umNivel);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //criar um registro
  static async criaNivel(req, res) {
    const novoNivel = req.body;

    try {
      const novoNivelCriada = await database.Niveis.create(novoNivel);

      return res.status(200).json(novoNivelCriada);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //atualizar um registro

  static async atualizaNivel(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Niveis.update(novasInfos, {
        where: {
          id: Number(id),
        },
      });
      const nivelAtualizado = await database.Niveis.findOne({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(nivelAtualizado);
    } catch (error) {
      return res.status(500).json(e.message);
    }
  }

  //deletar registros

  static async apagaNivel(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.destroy({
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

module.exports = NivelController;
