// controller/cursoController.js
const sequelize = require("../config/sequelize");
const Curso = require("../model/cursoModel");
const Profesor = require("../model/profesorModel");

class CursoController {

  async createCurso (req, res) {
    const transaction = await sequelize.transaction();
    try {
      const profesor = await Profesor.findByPk(req.body.profesor_id);
      if (!profesor) {
        await transaction.rollback();
        return res.status(404).json({ error: "Profesor no encontrado" });
      }
      const curso = await Curso.create(req.body);
      await transaction.commit();
      res.status(201).json(curso);
    } catch (error) {
      await transaction.rollback();
      res.status(400).json({ error: error.message });
    }
  };

  async getCursos(req, res) {
    try {
      const cursos = await Curso.findAll();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCursoById(req, res) {
    try {
      const curso = await Curso.findByPk(req.params.id);
      if (curso) {
        res.status(200).json(curso);
      } else {
        res.status(404).json({ error: "Curso no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCurso(req, res) {
    try {
      const transaction = await sequelize.transaction();
      const profesor = await Profesor.findByPk(req.body.profesor_id, { transaction });
      if (!profesor) {
        await transaction.rollback();
        return res.status(404).json({ error: "Curso no encontrado" });
      }
      const [updated] = await Curso.update(req.body, {
        where: { id: req.params.id }, transaction
      });
      if (updated) {
        const updatedCurso = await Curso.findByPk(req.params.id, { transaction });
        await transaction.commit();
        res.status(200).json(updatedCurso);
      } else {
        await transaction.rollback();
        res.status(404).json({ error: "Curso no encontrado" });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCurso(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const deleted = await Curso.destroy({
        where: { id: req.params.id },
        transaction,
      });

      if (deleted > 0) {
        await transaction.commit();
        res.status(200).json({ ok: "Curso eliminado" });
      } else {
        await transaction.rollback();
        res.status(404).json({ error: "Curso no encontrado" });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CursoController();

/*
const { json } = require("express");
const db = require("../database/conexion");

class CursoController {
  constructor() {}
  async consultar(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM cursos");
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async consultarUno(req, res) {
    const { id } = req.params;
    try {
      const [rows] = await db.query("SELECT * FROM cursos WHERE id = ?", [id]);
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).send("Curso no encontrado");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async insertar(req, res) {
    const { nombre, descripcion, profesor_id } = req.body;
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const [profesorRes] = await conn.query(
        `SELECT COUNT(*) AS cant FROM profesores WHERE id = ?`,
        [profesor_id]
      );
      if (profesorRes[0].cant === 0) {
        res.status(404).send("Profesor no encontrado");
      } else {
        const [cursosRes] = await conn.query(
          "INSERT INTO cursos (nombre, descripcion, profesor_id) VALUES (?,?,?)",
          [nombre, descripcion, profesor_id]
        );
        await conn.commit();
        res.status(200).json({ id: cursosRes.insertId });
      }
    } catch (err) {
      res.status(500).send(err.message);
      try {
        await conn.rollback();
      } catch (errorRoll) {
        return res.status(500).send(errorRoll.message);
      }
    } finally {
      conn.release();
    }
  }
  //Antes de la actualización hay que verificar que el profesor exista. Usar transaccion.
  async modificar(req, res) {
    const conn = await db.getConnection();
    try {
      const { id } = req.params;
      const { nombre, descripcion, profesor_id } = req.body;
      await conn.beginTransaction();
      const [profesorRes] = await conn.query(
        `SELECT COUNT(*) AS cant FROM profesores WHERE id = ?`,
        [profesor_id]
      );
      if (profesorRes[0].cant === 0) {
        return res.status(404).send("Profesor no encontrado");
      }

      const [cursosRes] = await conn.query(
        "UPDATE cursos SET nombre=?, descripcion=?, profesor_id=? WHERE id=?",
        [nombre, descripcion, profesor_id, id]
      );
      if (cursosRes.affectedRows === 0) {
        return res.status(404).send("Curso no encontrado");
      }

      await conn.commit();
      res.status(200).json(cursosRes);
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
  async eliminar(req, res) {
    const conn = await db.getConnection();
    try {
      const { id } = req.params;

      await conn.beginTransaction();

      const [deleteRes] = await conn.query("DELETE FROM cursos WHERE id = ?", [
        id,
      ]);

      if (deleteRes.affectedRows > 0) {
        await conn.commit();
        res.status(200).send("Curso eliminado");
      } else {
        await conn.rollback();
        res.status(404).send("Curso no encontrado");
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
module.exports = new CursoController();
*/
