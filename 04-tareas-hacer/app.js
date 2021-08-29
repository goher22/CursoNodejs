const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');

//const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear()

const main = async () => {
    //console.log('Hola mundo')

    let opt = '';
    const tareas = new Tareas()

    const tareaDB = leerDB()
    if(tareaDB) {
        tareas.cargarTareasFromArray(tareaDB)
    }

    do {
        opt = await inquireMenu()

        switch(opt) {
            case '1':
                const desc = await leerInput('Descripción:')
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listarPendienteCompletadas(true)
                break;
            case '4':
                tareas.listarPendienteCompletadas(false)
                break;
            
        }

        //console.log(opt)
        //opt = await mostrarMenu()

        //const tarea = new Tarea('Comprar comida');

        guardarDB(tareas.listadoArr)

        if (opt !== '0') await pausa()

    } while(opt !== '0')

}

main()