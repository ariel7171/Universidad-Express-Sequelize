const Inscripcion = require("../model/inscripcionModel");
const Curso = require("../model/cursoModel");
const Estudiante = require("../model/estudianteModel");

class InscripcionController {
  async consultarTodos(req, res) {
    try {
      const resultados = await Estudiante.findAll({
        attributes: ["nombre"],
        include: [
          {
            model: Curso,
            attributes: ["nombre"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      const result = resultados.map((estudiante) => ({
        estudiante: estudiante.nombre,
        cursos: estudiante.Cursos.map((curso) => curso.nombre),
      }));

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async consultarxCurso(req, res) {
    try {
      const { id } = req.params;
      const curso = await Curso.findByPk(id, {
        attributes: [],
        include: [
          {
            model: Estudiante,
            attributes: ["nombre"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (curso) {
        const result = curso.Estudiantes.map((estudiante) => ({
          estudiante: estudiante.nombre,
          curso: curso.nombre,
        }));
        res.status(200).json(result);
      } else {
        res.status(404).send("Inscripcion no encontrada");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async consultarxEstudiante(req, res) {
    try {
      const { id } = req.params;
      const estudiante = await Estudiante.findByPk(id, {
        attributes: [],
        include: [
          {
            model: Curso,
            attributes: ["nombre"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (estudiante) {
        const result = estudiante.Cursos.map((curso) => ({
          estudiante: estudiante.nombre,
          curso: curso.nombre,
        }));
        res.status(200).json(result);
      } else {
        res.status(404).send("Inscripcion no encontrada");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async inscribir(req, res) {
    const { curso_id, estudiante_id, nota } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const curso = await Curso.findByPk(curso_id, { transaction });
      if (!curso) {
        await transaction.rollback();
        return res.status(404).send("Curso no encontrado");
      }

      const estudiante = await Estudiante.findByPk(estudiante_id, {
        transaction,
      });
      if (!estudiante) {
        await transaction.rollback();
        return res.status(404).send("Estudiante no encontrado");
      }

      const inscripcion = await Inscripcion.create(
        {
          curso_id,
          estudiante_id,
          nota,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(200).json({ id: inscripcion.id });
    } catch (err) {
      try {
        await transaction.rollback();
      } catch (errorRoll) {
        return res.status(500).send(errorRoll.message);
      }
      res.status(500).send(err.message);
    }
  }

  async modificar(req, res) {
    const {
      old_curso_id,
      old_estudiante_id,
      new_curso_id,
      new_estudiante_id,
      nota,
    } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const nuevoCurso = await Curso.findByPk(new_curso_id, { transaction });
      if (!nuevoCurso) {
        await transaction.rollback();
        return res.status(404).send("Curso no encontrado");
      }

      const nuevoEstudiante = await Estudiante.findByPk(new_estudiante_id, {
        transaction,
      });
      if (!nuevoEstudiante) {
        await transaction.rollback();
        return res.status(404).send("Estudiante no encontrado");
      }

      const [updated] = await Inscripcion.update(
        {
          curso_id: new_curso_id,
          estudiante_id: new_estudiante_id,
          nota: nota,
        },
        {
          where: {
            curso_id: old_curso_id,
            estudiante_id: old_estudiante_id,
          },
          transaction,
        }
      );

      if (updated === 1) {
        await transaction.commit();
        res.status(200).send("Inscripción actualizada");
      } else {
        await transaction.rollback();
        res.status(404).send("Inscripción no encontrada");
      }
    } catch (err) {
      try {
        await transaction.rollback();
      } catch (errorRoll) {
        return res.status(500).send(errorRoll.message);
      }
      res.status(500).send(err.message);
    }
  }

  async eliminar(req, res) {
    const { curso_id, estudiante_id } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const deleted = await Inscripcion.destroy({
        where: {
          curso_id: curso_id,
          estudiante_id: estudiante_id,
        },
        transaction,
      });

      if (deleted > 0) {
        await transaction.commit();
        res.status(200).send("Inscripción eliminada");
      } else {
        await transaction.rollback();
        res.status(404).send("Inscripción no encontrada");
      }
    } catch (err) {
      try {
        await transaction.rollback();
      } catch (errorRoll) {
        return res
          .status(500)
          .send(`Error en el rollback: ${errorRoll.message}`);
      }
      res.status(500).send(err.message);
    }
  }
}

module.exports = new InscripcionController();

/*
const { json } = require("express");
const db = require("../database/conexion");

class InscripcionController {
  constructor() {}
  async consultarTodos(req, res) {
    try {
      const [result] =
        await db.query(`SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso FROM cursos_estudiantes
        INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id 
        INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id`);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async consultarxCurso(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.query(
        `SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso FROM cursos_estudiantes
          INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id 
          INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id
          WHERE cursos_estudiantes.curso_id = ?`,
        [id]
      );
      if (rows.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("Inscripcion no encontrada");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async consultarxEstudiante(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.query(
        `SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso FROM cursos_estudiantes
          INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id 
          INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id
          WHERE cursos_estudiantes.estudiante_id = ?`,
        [id]
      );
      if (rows.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("Inscripcion no encontrada");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async inscribir(req, res) {
    const { curso_id, estudiante_id } = req.body;
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const [cursoRes] = await conn.query(
        `SELECT COUNT(*) AS cant FROM cursos WHERE id = ?`,
        [curso_id]
      );
      if (cursoRes[0].cant === 0) {
        return res.status(404).send("Curso no encontrado");
      }
      const [estudianteRes] = await conn.query(
        `SELECT COUNT(*) AS cant FROM estudiantes WHERE id = ?`,
        [estudiante_id]
      );
      if (estudianteRes[0].cant === 0) {
        return res.status(404).send("Estudiante no encontrado");
      }
      const [inscripcionRes] = await conn.query(
        "INSERT INTO cursos_estudiantes (curso_id, estudiante_id) VALUES (?, ?)",
        [curso_id, estudiante_id]
      );
      await conn.commit();
      res.status(200).json({ id: inscripcionRes.insertId });
    } catch (err) {
      try {
        await conn.rollback();
      } catch (errorRoll) {
        return res.status(500).send(errorRoll.message);
      }
      res.status(500).send(err.message);
    } finally {
      conn.release();
    }
  }

  async modificar(req, res) {
    const { old_curso_id, old_estudiante_id, new_curso_id, new_estudiante_id } =
      req.body;
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const [cursoRes] = await conn.query(
        `SELECT COUNT(*) AS cant FROM cursos WHERE id = ?`,
        [new_curso_id]
      );
      if (cursoRes[0].cant === 0) {
        return res.status(404).send("Curso no encontrado");
      }
      const [estudianteRes] = await conn.query(
        `SELECT COUNT(*) AS cant FROM estudiantes WHERE id = ?`,
        [new_estudiante_id]
      );
      if (estudianteRes[0].cant === 0) {
        return res.status(404).send("Estudiante no encontrado");
      }
      const [inscripcionRes] = await conn.query(
        `UPDATE cursos_estudiantes SET curso_id = ?, estudiante_id = ? WHERE curso_id = ? AND estudiante_id = ?`,
        [new_curso_id, new_estudiante_id, old_curso_id, old_estudiante_id]
      );
      if (inscripcionRes.affectedRows === 1) {
        await conn.commit();
        res.status(404).send("Inscripcion actualizada");
      } else {
        await conn.rollback();
        res.status(404).send("Inscripcion no encontrada");
      }
    } catch (err) {
      try {
        await conn.rollback();
      } catch (errorRoll) {
        return res.status(500).send(errorRoll.message);
      }
      res.status(500).send(err.message);
    } finally {
      conn.release();
    }
  }

  async eliminar(req, res) {
    const { curso_id, estudiante_id } = req.body;
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const [deleteRes] = await conn.query(
        `DELETE FROM cursos_estudiantes WHERE curso_id = ? AND estudiante_id = ?`,
        [curso_id, estudiante_id]
      );
      if (deleteRes.affectedRows > 0) {
        await conn.commit();
        res.status(200).send("Inscripcion eliminada");
      } else {
        await conn.rollback();
        res.status(404).send("Inscripcion no encontrada");
      }
    } catch (err) {
      try {
        await conn.rollback();
      } catch (errorRoll) {
        return res
          .status(500)
          .send(`Error en el rollback: ${errorRoll.message}`);
      }
      res.status(500).send(err.message);
    } finally {
      conn.release();
    }
  }
}
module.exports = new InscripcionController();
*/
