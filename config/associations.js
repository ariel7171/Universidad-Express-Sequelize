// config/associations.js
const Curso = require('../model/cursoModel');
const Estudiante = require('../model/estudianteModel');
const Inscripcion = require('../model/inscripcionModel');
const Profesor = require('../model/profesorModel');

const setupAssociations = () => {
    Curso.belongsToMany(Estudiante, { through: Inscripcion, foreignKey: 'curso_id' });
    Estudiante.belongsToMany(Curso, { through: Inscripcion, foreignKey: 'estudiante_id' });
    Profesor.hasMany(Curso, { foreignKey: 'profesor_id' });
    Curso.belongsTo(Profesor, { foreignKey: 'profesor_id', as: 'profesor' });
}

module.exports = setupAssociations;