const { comprobarJWT } = require("../helpers/generar-jwt")


const socketController = async (socket) => {
    const usuario = await comprobarJWT(socket.handshake.headers['x-token'])
    if(!usuario) return socket.disconnect()
    console.log('Se conecto', usuario.nombre)
}

module.exports = {
    socketController
}