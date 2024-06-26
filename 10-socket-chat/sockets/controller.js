const { comprobarJWT } = require("../helpers/generar-jwt")
const { ChatMensajes } = require("../models")

const chatMensaje = new ChatMensajes()

const socketController = async (socket, io) => {
    
    const usuario = await comprobarJWT(socket.handshake.headers['x-token'])
    if(!usuario) return socket.disconnect()
    
    //Agregar el usuario conectado
    chatMensaje.conectarUsuario(usuario)
    io.emit('usuarios-activos', chatMensaje.usuariosArr)
    socket.emit('recibir-mensajes', chatMensaje.ultimos10)

    //Conectarlo a una sala expecial
    socket.join(usuario.id)

    //Limpiar cuando alguien se desconecte
    socket.on('desconnect', () => {
        chatMensaje.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensaje.usuariosArr)
    })

    socket.on('enviar-mensaje', ({uid, mensaje})=> {

        if(uid){
            socket.to(uid).emit('mensaje-privado', {de: usuario.nombre})
        }else{            
            chatMensaje.enviarMensaje(usuario.id, usuario.nombre, mensaje)
            io.emit('recibir-mensajes', chatMensaje.ultimos10)
        }

    })

}

module.exports = {
    socketController
}