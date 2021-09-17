const express = require('express')
const cors = require('cors')

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

        //CORS
        this.app.use(cors())

        //Directorio publico
        this.app.use(express.static('public'));
        
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'get API'
            })
        })
        this.app.put('/api', (req, res) => {
            res.status(400).json({
                msg: 'put API'
            })
        })
        this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: 'post API'
            })
        })
        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API'
            })
        })
    }
    
    
    listeb(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server