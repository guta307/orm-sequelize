const database = require("../models");
const Sequelize = require("sequelize");

const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices();
class PessoaController {
  //puxar todas as pessoas
  static async pegaPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
      return res.status(200).json(pessoasAtivas);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
      return res.status(200).json(todasAsPessoas);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //puxar uma pessoa pelo id
  static async pegaUmaPessoa(req, res) {
    const { id } = req.params;

    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json(umaPessoa);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //criar um registro
  static async criaPessoa(req, res) {
    const novaPessoa = req.body;

    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);

      return res.status(200).json(novaPessoaCriada);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //atualizar um registro

  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Pessoas.update(novasInfos, {
        where: {
          id: Number(id),
        },
      });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(e.message);
    }
  }

  //deletar registros

  static async apagaPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({ mensagem: `id ${id} foi deletado` });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
  //http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;

    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });

      res.status(200).json(umaMatricula);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };

    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );

      return res.status(200).json(novaMatriculaCriada);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;
    try {
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });

      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(e.message);
    }
  }

  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;

    try {
      await database.Matriculas.destroy({
        where: {
          //caso de erro de sintaxe no where é possível que destrua todos os dados
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });

      return res
        .status(200)
        .json({ mensagem: `id ${matriculaId} foi deletado` });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.restore({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ mensagem: `id ${id} foi restaurado` });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params;

    try {
      const pessoa = await database.Pessoas.findOne({
        where: {
          id: Number(estudanteId),
        },
      });
      console.log(pessoa);
      const matriculas = await pessoa.getAulasMatriculadas();

      return res.status(200).json(matriculas);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    try {
      const { turmaId } = req.params;

      const todasAsMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: turmaId,
          status: "confirmado",
        },
        //limit: 1,
        order: [["estudante_id", "ASC"]],
      });
      return res.status(200).json(todasAsMatriculas);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 4;
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
      });
      return res.status(200).json(turmasLotadas);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params;

    try {
      await pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId));
      return res.status(200).json({
        mensagem: `a pessoade de id: ${estudanteId} e suas matrículas foram canceladas`,
      });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
}

module.exports = PessoaController;
