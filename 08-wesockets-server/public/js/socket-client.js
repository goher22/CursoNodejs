
//referencias del html
const lblOnline = document.getElementById("lblOnline")
const lblOffline = document.getElementById("lblOffline")

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
