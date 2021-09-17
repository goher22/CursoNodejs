const express = require('express')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        //Middlewares
        this.middlewares()
        //Ruta de mi aplicacion
        this.routes()
    }

    middlewares() {
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello Word')
        })
    }
    
    
    listeb(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server