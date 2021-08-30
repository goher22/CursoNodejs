const inquirer = require('inquirer')
require('colors')

const inquireMenu = async () => {
    console.clear()
    console.log("=======================".green)
    console.log("Seleccionar una opción".white)
    console.log("=======================\n".green)

    const {opcion} = await inquirer.prompt(preguntas)
    return opcion
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
    leerInput
}