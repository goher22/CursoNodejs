const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices:[
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tarea completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tarea pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

const inquireMenu = async () => {
    console.clear()
    console.log("=======================".green)
    console.log("Seleccionar una opción".white)
    console.log("=======================\n".green)

    const {opcion} = await inquirer.prompt(preguntas)
    return opcion
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Precione ${'ENTER'.green} para continuar`
        }
    ]
    await inquirer.prompt(question)
}

const leerInput = async (message) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if(value.length === 0){
                return 'por favor ingrese un valor'
            }
            return true
        }
    }

    const {desc} = await inquirer.prompt(question)
    return desc
}

const listadotareasBorrar = async(tareas = []) => {
    const choices2 = tareas.map((tarea, i) => {
        const idx = `${i+1}`.green
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`
        }
    })
    const preguntas2 = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: choices2
        }
    ]
    const {id} = await inquirer.prompt(preguntas2)
    return id
}

module.exports = {
    inquireMenu,
    pausa, 
    leerInput,
    listadotareasBorrar
}

