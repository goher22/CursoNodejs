const { inquireMenu, pausa } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');

//const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear()

const main = async () => {
    console.log('Hola mundo')

    let opt = '';

    do {
        opt = await inquireMenu()
        console.log(opt)
        //opt = await mostrarMenu()

        //const tarea = new Tarea('Comprar comida');

        if (opt !== '0') await pausa()

    } while(opt !== '0')

}

main()