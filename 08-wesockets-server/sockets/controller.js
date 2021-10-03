
const socketController = (socket) => { 

    console.log('cliente conectado', socket.id)

    socket.on('disconnect', ()=> {
        console.log('cloente desconectado')
    })

    socket.on('emviar-mensaje', (payload, callback) => {

        const id = 123456;
        callback(id)

        socket.broadcast.emit('enviar-mensje', payload)
    })
}

module.exports = {
    socketController
}