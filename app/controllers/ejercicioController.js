const ejercicioModel = require('../models/ejerciciosModel')

function buscarTodo(req, res) {
    ejercicioModel.find({})
    .then(ejercicios => {
        if (ejercicios.length) {
            return res.status(200).send({ejercicios})
        }
        return res.status(204).send({
            mensaje: "No hay informacion que mostrar"
        })
    })
    .catch(e => {
        return res.status(404).send({
            mensaje: `Error al buscar la informacion ${e}`
        })
    })
}

function guardarEjercicio(req, res) {
    console.log(req.body)

    new ejercicioModel(req.body).save()
    .then(info => {
        return res.status(200).send({mensaje: "Informacion guardada correctamente", info})
    })
    .catch(e => {
        return res.status(404).send({mensaje: "Error al guardar", e})
    })
}

async function buscarEjercicio(req, res, next) {
    try {
        const { key, value } = req.params;

        if (!key || !value) {
            return res.status(400).send({ mensaje: "Parámetros insuficientes para la búsqueda" });
        }

        const consulta = { [key]: value };
        const info = await ejercicioModel.find(consulta);

        // Asegurarse de que req.body exista
        if (!req.body) req.body = {};

        req.body.ejercicios = info.length ? info : null;
        return next();

    } catch (error) {
        if (!req.body) req.body = {};
        req.body.e = error;
        return next();
    }
}

function mostrarEjercicio(req, res) {
    if (req.body?.e) {
        return res.status(500).send({
            mensaje: "Error al buscar la información",
            error: req.body.e.message || req.body.e
        });
    }

    if (!req.body?.ejercicios) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }

    return res.status(200).send({ ejercicios: req.body.ejercicios });
}


function eliminarEjercicio(req, res) {
    if(req.body.e) return res.status(404).send({
        mensaje: "Error al buscar la informacion",
        error: req.body.e})

    if(!req.body.ejercicios) return res.status(204).send({mensaje: "No hay informacion que mostrar"})
    req.body.ejercicios[0].remove()
    .then(info => {
        return res.status(200).send({mensaje: "Informacion Eliminada", info})
    })
    .catch(e => {
        return res.status(404).send({mensaje: "Error al eliminar la informacion", e})
    })
}

function editarEjercicio(req, res) {
    if (req.body?.e) {
        return res.status(500).send({
            mensaje: "Error al buscar la información",
            error: req.body.e.message || req.body.e
        });
    }

    if (!req.body?.ejercicios || req.body.ejercicios.length === 0) {
        return res.status(204).send({ mensaje: "No hay información que editar" });
    }

    const ejercicio = req.body.ejercicios[0];

    // Actualizar los campos con los nuevos datos del cuerpo de la petición
    Object.assign(ejercicio, req.body);

    ejercicio.save()
        .then(info => {
            return res.status(200).send({ mensaje: "Ejercicio actualizado correctamente", info });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al actualizar el ejercicio", error: e });
        });
}


module.exports = {
    buscarTodo,
    guardarEjercicio,
    buscarEjercicio, 
    mostrarEjercicio,
    eliminarEjercicio,
    editarEjercicio
}