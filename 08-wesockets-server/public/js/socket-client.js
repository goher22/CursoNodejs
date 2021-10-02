
//referencias del html
const lblOnline = document.getElementById("lblOnline")
const lblOffline = document.getElementById("lblOffline")
const textMensaje = document.getElementById("textMensaje")
const btnEnviar = document.getElementById("btnEnviar")

const socket = io()

socket.on('connect', () => {
    console.log("Conectado")
    lblOffline.style.display = 'node'
    lblOnline.style.display = ''
})

socket.on('disconnect', () => {
    console.log("Desconenctado  ")
    lblOnline.style.display = 'node'
    lblOffline.style.display = ''
})

btnEnviar.addEventListener('click', () => {
    const mensaje = textMensaje.value
    const payload = {
        mensaje,
        id: '123abc',
        fecha: new Date().getTime()
    }
    socket.emit('emviar-mensaje', payload)
})