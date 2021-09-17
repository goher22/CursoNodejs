const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //Middlewares
        this.middlewares()

        //Ruta de mi aplicacion
        this.routes()
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
    }
    
    
    listeb(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server