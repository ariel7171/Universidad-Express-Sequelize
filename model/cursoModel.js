// model/profesor.js
const { DataTypes } = require('sequelize');  
const sequelize = require('../config/sequelize'); 

const Curso = sequelize.define('Curso', {  
    id: {  
        type: DataTypes.INTEGER(11),  
        autoIncrement: true,  
        primaryKey: true,  
        allowNull: false  
    },   
    nombre: {  
        type: DataTypes.STRING(64), 
        allowNull: true 
    },  
    descripcion: {  
        type: DataTypes.TEXT,  
        allowNull: true 
    },  
    profesor_id: {  
        type: DataTypes.INTEGER(11),  
        allowNull: true 
    }
}, {  
    tableName: 'cursos',  
    timestamps: false 
});  

module.exports = Curso;