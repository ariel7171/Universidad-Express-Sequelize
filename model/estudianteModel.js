// model/estudiante.js
const { DataTypes } = require('sequelize');  
const sequelize = require('../config/sequelize');

const Estudiante = sequelize.define('Estudiante', {  
    id: {  
        type: DataTypes.INTEGER,  
        autoIncrement: true,  
        primaryKey: true,  
        allowNull: false  
    },  
    dni: {  
        type: DataTypes.STRING(15),  
        allowNull: true  
    },  
    nombre: {  
        type: DataTypes.STRING(50), 
        allowNull: true 
    },  
    apellido: {  
        type: DataTypes.STRING(50), 
        allowNull: true 
    },  
    email: {  
        type: DataTypes.STRING(50),  
        allowNull: true,  
        validate: {  
            isEmail: true  
        }  
    }  
}, {  
    tableName: 'estudiantes', 
    timestamps: false 
});  
 
module.exports = Estudiante;