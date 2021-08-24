const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices:['op1', 'op2', 'op3']
    }
]

const inquireMenu = async () => {
    console.clear()
    console.log("=======================".green)
    console.log("Seleccionar una opción".green)
    console.log("=======================\n".green)

    const opt = await inquirer.prompt(preguntas)
    return opt
}

module.exports = {
    inquireMenu
}

