import express, { Application } from "express";
import cors from "cors";

import userRoutes from '../routes/usuario';

class Server {

    private app: Application;
    private port: String;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Metodos iniciales
        this.middlewares()
        this.routes();

    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //LEctura del body
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puesto: ' + this.port);
        })
    }

}


export default Server;