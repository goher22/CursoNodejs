let usuario = null
let socket = null

//Referencia HTML

const txtUid = document.querySelector("#txtUid")
const txtMensaje = document.querySelector("#txtMensaje")
const ulUsuarios = document.querySelector("#ulUsuarios")
const ulMensaje = document.querySelector("#ulMensaje")
const btnSalir = document.querySelector("#btnSalir")

//Validar el token del localStorage
const validarJWT = async() => {
    const token = localStorage.getItem('token') || ''
    if(token.length <= 10) {
        window.location = 'index.html'
        throw new Error('No hay token en el servidor')
    }

    const resp = await fetch('http://localhost:8080/api/auth/',{
        headers: {'x-token': token}
    })

    const {usuario: userDB, token: tokenDB} = await resp.json()

    localStorage.setItem('token', tokenDB)
    usuario = userDB
    document.title = usuario.nombre

    await conectarSocket()

}

const conectarSocket = async() => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    })

    socket.on('connect', () =>{
        console.log('Sockets online')
    })

    socket.on('disconnect', () => {
        console.log('Sockets offline')
    })

    socket.on('recibir-mensajes', (payload) => {
        console.log(payload)
    })

    socket.on('usuarios-activos', dibujarUsuarios)
    
    socket.on('mensaje-privado', () => {
        //TODO
    })



}

const dibujarUsuarios = (usuarios = []) => {

    let usersHtml = ''

    usuarios.forEach(({nombre, uid}) => {
        usersHtml +=`
            <li>
                <p>
                    <h5 class="text-success">${nombre}</h5>
                    <span class="fs-6">${uid}</span>
                </p>
            </li>
        `
    })

    ulUsuarios.innerHTML = usersHtml

}

txtMensaje.addEventListener('keyup', ({keyCode}) => {
    
    const mensaje = txtMensaje.value
    const uid = txtUid.value
    
    if(keyCode !== 13) return;
    if(mensaje.length === 0) return;

    socket.emit('enviar-mensaje', {mensaje, uid})

    txtMensaje.value = ''
     

})

const main = async () => {
    //Validar JWT
    await validarJWT()
}

main()
