const express = require('express')
const router = express.Router()

router.get('/ejercicios', (req, res) => {
    res.json({mensaje: "Hola mundo"})
})

module.exports = router