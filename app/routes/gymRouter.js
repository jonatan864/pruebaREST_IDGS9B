const express = require('express')
const router = express.Router()
const ejercicioController = require('../controllers/ejercicioController')

router.get('/ejercicios', ejercicioController.buscarTodo)
router.post('/ejercicios', ejercicioController.guardarEjercicio)
router.get('/ejercicios/:key/:value', ejercicioController.buscarEjercicio, ejercicioController.mostrarEjercicio)
router.delete('/ejercicios/:key/:value', ejercicioController.buscarEjercicio, ejercicioController.eliminarEjercicio)
router.put('/ejercicios/:key/:value', ejercicioController.buscarEjercicio, ejercicioController.editarEjercicio)

module.exports = router