// estudianteRoutes.js
const express = require('express');  
const router = express.Router();  
const estudianteController = require('../controller/estudianteController');  

router.post('/', estudianteController.createEstudiante);  
router.get('/', estudianteController.getEstudiantes);

router.route('/:id')
    .get(estudianteController.getEstudianteById)
    .put(estudianteController.updateEstudiante)
    .delete(estudianteController.deleteEstudiante);

module.exports = router; 
/*
const express=require('express');
const route=express.Router();
const estudianteController=require('../controller/estudianteController');

route.get('/', estudianteController.consultar);

route.post('/', estudianteController.createEstudiante);

route.route('/:id')
    .get(estudiantesController.consultarUno)
    .put(estudiantesController.modificar)
    .delete(estudiantesController.eliminar);

module.exports=route;
*/