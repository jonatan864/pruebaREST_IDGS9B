const mongoose = require('mongoose')
const config = require('./configuracion')

module.exports = {
    connection: null,
    connect: () => {
        if (this.connection) 
            return this.connection
            return mongoose.connect(config.DB)
            .then(conn => {
                this.connection = conn
                console.log("La conexion se ha realizado de manera correcta")
            })
            .catch(e => {console.log('Error en la conexion', e)})
        
    }
}