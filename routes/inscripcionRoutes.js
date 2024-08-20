// inscripcionRoutes.js
const express = require('express');  
const router = express.Router();  
const inscripcionController = require('../controller/inscripcionController');  

router.get('/curso/:id', inscripcionController.consultarxCurso);
router.get('/estudiante/:id', inscripcionController.consultarxEstudiante);

router.route('/')    
    .get(inscripcionController.consultarTodos)
    .post(inscripcionController.inscribir)
    .put(inscripcionController.modificar)
    .delete(inscripcionController.eliminar);

module.exports = router; 