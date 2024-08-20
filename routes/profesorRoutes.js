// profesorRoutes.js
const express = require('express');  
const router = express.Router();  
const profesorController = require('../controller/profesorController');  

router.post('/', profesorController.createProfesor);  
router.get('/', profesorController.getProfesores);

router.route('/:id')
    .get(profesorController.getProfesorById)
    .put(profesorController.updateProfesor)
    .delete(profesorController.deleteProfesor);

module.exports = router; 

/*
const express=require('express');
const route=express.Router();
const profesoresController=require('../controller/profesoresController');

route.get('/', profesoresController.consultar);

route.post('/', profesoresController.insertar);

route.route('/:id')
    .get(profesoresController.consultarUno)
    .put(profesoresController.modificar)
    .delete(profesoresController.eliminar);

module.exports=route;
*/