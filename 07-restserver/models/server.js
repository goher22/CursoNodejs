const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const {dbConnection} = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            user: '/api/users',
            category: '/api/categorias',
            product: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }
        
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

        //Fileupload - Carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.paths.user, require('../routes/user'))
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.category, require('../routes/categorias'))
        this.app.use(this.paths.product, require('../routes/productos'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }
    
    
    listeb(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server