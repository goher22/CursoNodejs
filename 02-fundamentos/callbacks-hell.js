const empleados = [
    {
        id: 1,
        nombre: 'Carlos'
    },
    {
        id: 2,
        nombre: 'Jaun'
    },
    {
        id: 3,
        nombre: 'Marina'
    },
]

const Salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
]

const getEmpleado = (id, callback) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre
    if (empleado){
        return callback(null, empleado)
    }else{
        return callback(`Empleado con id ${id} no existe`)
    }
}

const getSalario = (id, callback) => {
    const salario = Salarios.find((e) => e.id === id)?.salario
    if(salario){
        return callback(null, salario)
    }else{
        return callback(`No existe el salario para el ${id}`)
    }
}

const id = 3

getEmpleado(id, (err, empleado) => {
    if(err) {
        console.log(`ERROR!`)
        return console.log(err)
    }
    getSalario(id, (err, salario) => {
        if(err){
            console.log('ERROR!')
            return console.log(err)
        }
        console.log('El empleado: ', empleado, ' tiene un salario de: ', salario)
    })
})