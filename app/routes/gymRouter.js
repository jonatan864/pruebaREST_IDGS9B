const express = require('express')
const router = express.Router()
const ejercicioController = require('../controllers/ejercicioController')

router.get('/ejercicios', ejercicioController.buscarTodo)

module.exports = router