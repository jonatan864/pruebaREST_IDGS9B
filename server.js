const app = require('./app/app')
const config = require('./app/config/configuracion')

app.listen(config.PORT, () => {
    console.log("Servidor corriendo en el puerto: ", config.PORT)
})

