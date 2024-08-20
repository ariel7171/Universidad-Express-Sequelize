// controller/profesorController.js
const sequelize = require("../config/sequelize");
const Profesor = require('../model/profesorModel');
const Curso = require('../model/cursoModel');

class ProfesorController {
    async createProfesor(req, res) {
        try {
            const profesor = await Profesor.create(req.body);
            res.status(201).json(profesor);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getProfesores(req, res) {
        try {
            const profesores = await Profesor.findAll();
            res.status(200).json(profesores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProfesorById(req, res) {
        try {
            const profesor = await Profesor.findByPk(req.params.id);
            if (profesor) {
                res.status(200).json(profesor);
            } else {
                res.status(404).json({ error: 'Profesor no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProfesor(req, res) {
        try {
            const [updated] = await Profesor.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedProfesor = await Profesor.findByPk(req.params.id);
                res.status(200).json(updatedProfesor);
            } else {
                res.status(404).json({ error: 'Profesor no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProfesor(req, res) {
      const transaction = await sequelize.transaction();

      try {
          const cursos = await Curso.findAll({
              where: { profesor_id: req.params.id },
              transaction
          });

          if (cursos.length > 0) {
              await transaction.rollback();
              return res.status(400).json({ error: 'No se puede eliminar el profesor porque está asignado a uno o más cursos' });
          }

          const deleted = await Profesor.destroy({
              where: { id: req.params.id },
              transaction
          });

          if (deleted > 0) {
              await transaction.commit();
              res.status(200).json({ ok: 'Profesor eliminado' });
          } else {
              await transaction.rollback();
              res.status(404).json({ error: 'Profesor no encontrado' });
          }
          
      } catch (error) {
          await transaction.rollback();
          res.status(500).json({ error: error.message });
      }
  }
}

module.exports = new ProfesorController();

/*
const { json } = require("express");
const db = require("../database/conexion");

class ProfesorController {
  constructor() {}
  async consultar(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM profesores");
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async consultarUno(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM profesores WHERE id=?", [
        id,
      ]);
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).send("Profesor no encontrado");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async insertar(req, res) {
    try {
      const { dni, nombre, apellido, email, profesion, telefono } = req.body;
      const [rows] = await db.query(
        "INSERT INTO profesores (dni, nombre, apellido, email, profesion, telefono) VALUES (?,?,?,?,?,?)",
        [dni, nombre, apellido, email, profesion, telefono]
      );
      res.status(200).json({ id: rows.insertId });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async modificar(req, res) {
    try {
      const { id } = req.params;
      const { dni, nombre, apellido, email, profesion, telefono } = req.body;
      const [rows] = await db.query(
        "UPDATE profesores SET dni=?, nombre=?, apellido=?, email=?, profesion=?, telefono=? WHERE id=?",
        [dni, nombre, apellido, email, profesion, telefono, id]
      );
      if (rows.affectedRows === 0) {
        res.status(404).send("Profesor no encontrado");
      } else {
        res.status(200).json(rows);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async eliminar(req, res) {
    const { id } = req.params;
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const [cursosRes] = await conn.query(
        `SELECT COUNT(*) AS cant FROM cursos WHERE profesor_id = ?`,
        [id]
      );
      if (cursosRes[0].cant > 0) {
        //await conn.rollback();
        return res.status(400).send("El profesor tiene cursos asignados");
      } else {
        const [deleteRows] = await conn.query(
          "DELETE FROM profesores WHERE id = ?",
          [id]
        );
        if (deleteRows.affectedRows > 0) {
          await conn.commit();
          res.status(200).send("Profesor eliminado");
        } else {
          await conn.rollback();
          res.status(404).send("El profesor no pudo ser eliminado");
        }
      }
    } catch (err){
      res.status(500).send(err.message);
    } finally {
      conn.release();
    }
  }
}
module.exports = new ProfesorController();
*/