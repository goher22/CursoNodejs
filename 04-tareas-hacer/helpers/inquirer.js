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
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tarea completadas'
            },
            {
                value: '4',
                name: '4. Listar tarea pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            }
        ]
    }
]

const inquireMenu = async () => {
    console.clear()
    console.log("=======================".green)
    console.log("Seleccionar una opción".green)
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

module.exports = {
    inquireMenu,
    pausa, 
    leerInput
}

