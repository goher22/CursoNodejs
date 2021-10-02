const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = { }

        //Middlewares
        this.middlewares()

        //Ruta de mi aplicacion
        this.routes()

        //Sockets
        this.sockets()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Directorio publico
        this.app.use(express.static('public'))

    }

    routes() { }
    
    sockets(){

        this.io.on('connection', socket => { 
            console.log('cliente conectado')
            socket.on('disconnect', ()=> {
                console.log('cloente desconectado')
            })
            socket.on('emviar-mensaje', (payload) => {
                console.log(payload)
            })
        });

    }
    
    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server