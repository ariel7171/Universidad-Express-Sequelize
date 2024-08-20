// controller/estudianteController.js
const Estudiante = require('../model/estudianteModel');

class EstudianteController {
    async createEstudiante(req, res) {
        try {
            const estudiante = await Estudiante.create(req.body);
            res.status(201).json(estudiante);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getEstudiantes(req, res) {
        try {
            const estudiantes = await Estudiante.findAll();
            res.status(200).json(estudiantes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEstudianteById(req, res) {
        try {
            const estudiante = await Estudiante.findByPk(req.params.id);
            if (estudiante) {
                res.status(200).json(estudiante);
            } else {
                res.status(404).json({ error: 'Estudiante no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEstudiante(req, res) {
        try {
            const [updated] = await Estudiante.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedEstudiante = await Estudiante.findByPk(req.params.id);
                res.status(200).json(updatedEstudiante);
            } else {
                res.status(404).json({ error: 'Estudiante no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteEstudiante(req, res) {
        try {
            const deleted = await Estudiante.destroy({
                where: { id: req.params.id }
            });
            if (deleted>0) {
                res.status(200).json({ ok: 'Estudiante eliminado' });
            } else {
                res.status(404).json({ error: 'Estudiante no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EstudianteController();


/*
const Estudiante = require('../model/estudiante');  

// Crear un nuevo estudiante  
exports.createEstudiante = async (req, res) => {  
    try {  
        const estudiante = await Estudiante.create(req.body);  
        res.status(201).json(estudiante);  
    } catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
};  

// Obtener todos los estudiantes  
exports.getEstudiantes = async (req, res) => {
  console.log("getEstudiantes");
    try {  
        const estudiantes = await Estudiante.findAll();  
        res.status(200).json(estudiantes);  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
};  

// Obtener un estudiante por ID  
exports.getEstudianteById = async (req, res) => {  
    try {  
        const estudiante = await Estudiante.findByPk(req.params.id);  
        if (estudiante) {  
            res.status(200).json(estudiante);  
        } else {  
            res.status(404).json({ error: 'Estudiante no encontrado' });  
        }  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
};  

// Actualizar un estudiante  
exports.updateEstudiante = async (req, res) => {  
    try {  
        const [updated] = await Estudiante.update(req.body, {  
            where: { id: req.params.id }  
        });  
        if (updated) {  
            const updatedEstudiante = await Estudiante.findByPk(req.params.id);  
            res.status(200).json(updatedEstudiante);  
        } else {  
            res.status(404).json({ error: 'Estudiante no encontrado' });  
        }  
    } catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
};  

// Eliminar un estudiante  
exports.deleteEstudiante = async (req, res) => {  
    try {  
        const deleted = await Estudiante.destroy({  
            where: { id: req.params.id }  
        });  
        if (deleted) {  
            res.status(204).send();  
        } else {  
            res.status(404).json({ error: 'Estudiante no encontrado' });  
        }  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
};
*/
/*
const { json } = require("express");
const db = require("../database/conexion");

class EstudianteController {
  constructor() {}

  async consultar(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM estudiantes");
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async consultarUno(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM estudiantes WHERE id=?", [
        id,
      ]);
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).send("Estudiante no encontrado");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async insertar(req, res) {
    try {
      const { dni, nombre, apellido, email } = req.body;
      const [rows] = await db.query(
        "INSERT INTO estudiantes (dni, nombre, apellido, email) VALUES (?,?,?,?)",
        [dni, nombre, apellido, email]
      );
      res.status(200).json({ id: rows.insertId });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async modificar(req, res) {
    try {
      const { id } = req.params;
      const { dni, nombre, apellido, email } = req.body;
      const [rows] = await db.query(
        "UPDATE estudiantes SET dni=?, nombre=?, apellido=?, email=? WHERE id=?",
        [dni, nombre, apellido, email, id]
      );
      if (rows.affectedRows > 0) {
        res.status(200).send("Estudiante modificado");
      } else {
        res.status(404).send("Estudiante no encontrado");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("DELETE FROM estudiantes WHERE id=?", [id]);
      if (rows.affectedRows > 0) {
        res.status(200).send("Estudiante eliminado");
      } else {
        res.status(404).send("Estudiante no encontrado");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new EstudianteController();
*/