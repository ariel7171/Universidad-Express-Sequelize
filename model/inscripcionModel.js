// model/inscripcion.js
const { DataTypes } = require('sequelize');  
const sequelize = require('../config/sequelize');

const Inscripcion = sequelize.define('Inscripcion', {  
    curso_id: {  
        type: DataTypes.INTEGER(11),   
        primaryKey: true,  
        allowNull: false  
    },
    estudiante_id: {  
        type: DataTypes.INTEGER(11),   
        primaryKey: true,  
        allowNull: false  
    },      
    nota: {  
        type: DataTypes.INTEGER(11),  
        allowNull: true
    }
}, {  
    tableName: 'cursos_estudiantes',
    timestamps: false
});  

module.exports = Inscripcion;