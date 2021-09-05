const { inquireMenu, pausa, leerInput } = require("./helpers/inquirer")
const Busquedas = require("./models/busqueda")

const main = async() =>{
    
    const busqueda = new Busquedas()
    let opt

    do{
        opt = await inquireMenu()

        switch(opt){
            case 1:
                const lugar = await leerInput('Ciudad: ')
                busqueda.ciudad(lugar)
                console.log('\nInformacion del alciudad\n'.green)
                console.log('Ciudad:', )
                console.log('Lat:', )
                console.log('Lng:', )
                console.log('Temperatura:', )
                console.log('Mínima:', )
                console.log('Máxima:', )
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