const { inquireMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer")
const Busquedas = require("./models/busqueda")
require('dotenv').config()

const main = async() =>{
    
    const busqueda = new Busquedas()
    let opt

    do{
        opt = await inquireMenu()

        switch(opt){
            case 1:
                const termino = await leerInput('Ciudad: ')
                const lugares = await busqueda.ciudad(termino)
                const id = await listarLugares(lugares)
                const lugarSel = lugares.find(l => l.id === id)
                const clima = await busqueda.climaLugar(lugarSel.lat, lugarSel.lng)
                console.log('\nInformacion del alciudad\n'.green)
                console.log('Ciudad:', lugarSel.nombre.green)
                console.log('Lat:', lugarSel.lat)
                console.log('Lng:', lugarSel.lng)
                console.log('Temperatura:', clima.temp)
                console.log('Mínima:', clima.min)
                console.log('Máxima:', clima.max)
                console.log('Como esta el clima:', clima.desc.green)
                break
            case 2:
                break
            case 0:
                break
        }

        if (opt !== 0) await pausa()

    }while(opt !== 0)
}

main()