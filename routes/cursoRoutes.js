// cursoRoutes.js
const express = require('express');  
const router = express.Router();  
const cursoController = require('../controller/cursoController');  

router.post('/', cursoController.createCurso);  
router.get('/', cursoController.getCursos);

router.route('/:id')
    .get(cursoController.getCursoById)
    .put(cursoController.updateCurso)
    .delete(cursoController.deleteCurso);

module.exports = router; 

/*
const express=require('express');
const route=express.Router();
const cursosController=require('../controller/cursosController');

route.get('/', cursosController.consultar);

route.post('/', cursosController.insertar);

route.route('/:id')
    .get(cursosController.consultarUno)
    .put(cursosController.modificar)
    .delete(cursosController.eliminar);

module.exports=route;
*/