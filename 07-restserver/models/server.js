const express = require('express')
const cors = require('cors')

const {dbConnection} = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //Conectar a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //Ruta de mi aplicacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Parseo y lectura del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))

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