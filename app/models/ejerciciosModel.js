const mongoose = require('mongoose')
const ejercicioEschema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        required: true
    },

    duracion: {
        type: Number,
        required: true
    },

    calorias: {
        type: Number,
        required: true
    }
})

const ejercicio = mongoose.model('ejercicios', ejercicioEschema)
module.exports = ejercicio